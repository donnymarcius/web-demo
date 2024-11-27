import { google } from 'googleapis';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../../../lib/sendVerificationEmail';
import { createToken } from '../../../lib/tokenManager';

export async function POST(req) {
  const { email, password } = await req.json();

  // Authenticate with Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  try {
    // Step 1: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 2: Generate the verification token
    const verificationToken = createToken();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24); // Token valid for 24 hours

    // Step 3: Get the current date as the creation date
    const dateCreated = new Date().toISOString(); // ISO format (e.g., 2024-11-27T10:00:00.000Z)

    // Step 4: Fetch all user data from the sheet to determine the next ID
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'mentee-account!A2:A', // Fetch IDs from column A
    });

    const rows = getResponse.data.values || [];
    const lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
    let newUserId = 1;

    if (lastRow) {
      const lastId = parseInt(lastRow[0], 10); // Parse the last ID as an integer
      newUserId = lastId + 1;
    }

    // Step 5: Append the new user row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'mentee-account!A2:G', // Adjust range to include column G
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          newUserId, // New ID
          email, // Email
          hashedPassword, // Hashed password
          verificationToken, // Verification token
          tokenExpiration.toISOString(), // Token expiration
          'Pending', // Verification status
          dateCreated, // Creation date in column G
        ]],
      },
    });

    // Step 6: Send a verification email with the generated token
    const verificationLink = `${process.env.FRONTEND_URL}/mentoring/verify?token=${verificationToken}`;
    console.log('Verification Link:', verificationLink);
    await sendVerificationEmail(email, verificationToken);

    return new Response(
      JSON.stringify({ success: true, message: 'User registered successfully. Please check your email to verify your account.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to register user.' }), {
      status: 500,
    });
  }
}
