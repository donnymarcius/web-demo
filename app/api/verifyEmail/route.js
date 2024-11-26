import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Set up Google Sheets API client
const sheets = google.sheets('v4');
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;  // Your Google Sheets Spreadsheet ID

export async function POST(req) {
  try {
    const { token } = await req.json();

    // Step 1: Verify the token (using your custom token verification method)
    if (!token) {
      return NextResponse.json(
        { message: 'Token is missing.' },
        { status: 400 }
      );
    }

    console.log("Received token:", token);  // Log the received token

    // Step 2: Fetch existing user data from Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const getResponse = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'mentee-account!A2:G',  // Adjust the range to include all relevant columns
    });

    const rows = getResponse.data.values || [];
    console.log("All rows from Google Sheets:", rows);  // Log all rows from the sheet

    let userIndex = -1;

    // Step 3: Search for the user by token (assuming the token is in Column E)
    rows.forEach((row, index) => {
      console.log(`Checking token in row ${index + 1}:`, row[4]);  // Log the token from each row (Column E)
      if (row[4] === token) {  // Column E: verificationToken
        userIndex = index;
      }
    });

    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'Token not found or invalid.' },
        { status: 404 }
      );
    }

    // Step 4: Check if the token is expired (Column F: token expiration)
    const userRow = rows[userIndex];
    const tokenExpiration = new Date(userRow[5]);  // Column F: token expiration

    console.log("Token expiration time:", tokenExpiration);  // Log token expiration time

    if (Date.now() > tokenExpiration.getTime()) {
      return NextResponse.json(
        { message: 'Verification token has expired.' },
        { status: 400 }
      );
    }

    // Step 5: Update the user's verification status in Google Sheets (Column G: email_verified_status)
    const updatedValues = [
      ...rows.slice(0, userIndex),
      [...userRow.slice(0, 6), 'Verified'],  // Update the verification status in Column G
      ...rows.slice(userIndex + 1),
    ];

    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: 'mentee-account!A2:G',  // Adjust the range for your data
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
