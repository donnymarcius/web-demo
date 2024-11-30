// pages/api/userMentee.js
import { google } from 'googleapis';
import { NextResponse } from 'next/server'; // Use NextResponse for easier response handling

// Set up Google Sheets API client
const sheets = google.sheets('v4');
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID; // Your Google Sheets Spreadsheet ID

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);  // Next.js 13+ approach to accessing query params
    const email = searchParams.get('email');    // Get email from query params

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Step 1: Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Step 2: Fetch existing user data from Google Sheets (assuming mentee-account sheet)
    const getResponse = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'mentee-account!A2:V', // Adjusted to cover all relevant columns (A to V)
    });

    const rows = getResponse.data.values || [];

    let menteeIndex = -1;

    // Step 3: Search for the mentee by email (Column B: index 1)
    rows.forEach((row, index) => {
      if (row[1] === email) {  // Column B: email
        menteeIndex = index;
      }
    });

    if (menteeIndex === -1) {
      return NextResponse.json({ message: 'Mentee not found' }, { status: 404 });
    }

    // Step 4: Fetch mentee data
    const menteeData = rows[menteeIndex];
    const fullName = menteeData[11];  // Column L: full_name (adjust column if needed)
    const gender = menteeData[12];
    const wa_number = menteeData[13];
    const role = menteeData[14];
    const affiliation = menteeData[15];
    const almamater = menteeData[16];
    const category = menteeData[17];
    const field_of_interest = menteeData[18];
    const description = menteeData[19];
    const linkedin_username = menteeData[20];
    const profile_picture = menteeData[21];

    // Return the mentee data
    return NextResponse.json({ fullName, gender, wa_number, role, affiliation, almamater, category, field_of_interest, description, linkedin_username, profile_picture }, { status: 200 });

  } catch (error) {
    console.error('Error fetching mentee data:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching mentee data.' },
      { status: 500 }
    );
  }
}
