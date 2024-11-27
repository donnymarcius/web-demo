import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Set up Google Sheets API client
const sheets = google.sheets('v4');
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID; // Your Google Sheets Spreadsheet ID

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Token is missing.' }, { status: 400 });
    }

    console.log('Received token:', token); // Log the received token

    // Step 2: Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Fetch existing user data from Google Sheets
    const getResponse = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'mentee-account!A2:F', // Adjusted to cover columns A to F
    });

    const rows = getResponse.data.values || [];
    console.log('All rows from Google Sheets:', rows); // Log all rows from the sheet

    let userIndex = -1;

    // Search for the user by token (Column D: index 3)
    rows.forEach((row, index) => {
      console.log(`Checking token in row ${index + 1}:`, row[3]); // Log the token from each row
      if (row[3] === token) {
        userIndex = index;
      }
    });

    if (userIndex === -1) {
      return NextResponse.json({ message: 'Token not found or invalid.' }, { status: 404 });
    }

    // Check if the token is expired (Column E: index 4)
    const userRow = rows[userIndex];
    const tokenExpiration = new Date(userRow[4]); // Column E: token expiration

    console.log('Token expiration time:', tokenExpiration); // Log token expiration time

    if (Date.now() > tokenExpiration.getTime()) {
      return NextResponse.json({ message: 'Verification token has expired.' }, { status: 400 });
    }

    // Update the user's verification status in Google Sheets (Column F: index 5)
    const updatedValues = [
      ...rows.slice(0, userIndex),
      [...userRow.slice(0, 5), 'Verified'], // Update the verification status in Column F
      ...rows.slice(userIndex + 1),
    ];

    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: 'mentee-account!A2:F', // Adjusted range for the data
      valueInputOption: 'RAW',
      requestBody: {
        values: updatedValues,
      },
    });

    return NextResponse.json(
      { message: 'Email verified successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { message: 'An error occurred while verifying your email.' },
      { status: 500 }
    );
  }
}
