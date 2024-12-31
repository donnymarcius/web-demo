import { google } from 'googleapis';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth'; // Import getServerSession from next-auth

export async function POST(req) {
  const { email, password } = await req.json();
  const { searchParams } = new URL(req.url);
  const position = searchParams.get('position'); // 'mentee' or 'mentor'

  if (!email || !password || !position) {
    return new Response(
      JSON.stringify({ message: 'Email, password, and position are required.' }),
      { status: 400 }
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = position === 'mentee' ? 'mentee-account!A2:F' : 'mentor-account!A2:F';
  console.log(sheets)

  try {
    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    if (!response || !response.data || !response.data.values) {
      throw new Error('No data found in the Google Sheets response');
    }

    const rows = response.data.values || [];
    console.log('Fetched rows:', rows);  // Log rows to check data format

    // Check if email exists and password matches
    const user = rows.find((row) => row[1] === email); // Column B: Email
    if (!user) {
      console.error('User not found:', email);
      return new Response(JSON.stringify({ message: 'Invalid email or password.' }), {
        status: 401,
      });
    }

    console.log('User found:', user);  // Log the user data to verify correct user is found

    // Check password hash
    const passwordMatch = await bcrypt.compare(password, user[2]); // Column C: Password (hashed)
    if (!passwordMatch) {
      console.log('Password mismatch. Password:', password, 'Hash:', user[2]);
      return new Response(JSON.stringify({ message: 'Invalid email or password.' }), {
        status: 401,
      });
    }

    // After successful login, create a session
    const session = await getServerSession();

    // Set session data (this part would depend on your session provider configuration)
    // You can customize this according to your app's needs (e.g., store user info)
    session.user = {
      email,
      fullName: user[0], // Assuming 'user[0]' is the full name
      position,
    };

    // Redirect to dashboard or the user's profile page
    return new Response(JSON.stringify({ message: 'Login successful!', user: session.user }), { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error.message || error);  // Log error message
    return new Response(JSON.stringify({ message: 'An error occurred.' }), {
      status: 500,
    });
  }
}
