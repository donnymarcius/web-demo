import { google } from 'googleapis';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../../../lib/sendVerificationEmail';
import { createToken } from '../../../lib/tokenManager';

export async function POST(req) {
  const { username, email, password } = await req.json();

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

    // Step 2: Generate the verification token (only once)
    const verificationToken = createToken();  // This should only be called once
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24); // Token valid for 24 hours

    // Step 3: Fetch all user data from the sheet
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'mentee-account!A2:A',  // Ensure you're fetching all rows for consistency
    });

    const rows = getResponse.data.values || [];
    const lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
    let newUserId = 1;

    // Step 4: If there are existing users, increment the last ID
    if (lastRow) {
      const lastId = parseInt(lastRow[0], 10); // Parse the last ID to ensure it's treated as a number
      newUserId = lastId + 1;
    }

    // Step 5: Append the new user row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'mentee-account!A2:G',  // Ensure it starts at row 2 to avoid header rows
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          newUserId,  // New ID (incremented)
          username,
          email,
          hashedPassword,
          verificationToken,
          tokenExpiration.toISOString(),
          'Pending' // Verification status
        ]],
      },
    });

    // Step 6: Send a verification email with the generated token
    const verificationLink = `${process.env.FRONTEND_URL}/mentoring/verify?token=${verificationToken}`;
    console.log("Verification Link:", verificationLink); // Log the link being sent
    await sendVerificationEmail(email, verificationToken); // Pass token here

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
