// pages/api/userMentor.js
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

    // Step 2: Fetch existing user data from Google Sheets (assuming mentor-account sheet)
    const getResponse = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'mentor-account!A2:V', // Adjusted to cover all relevant columns (A to V)
    });

    const rows = getResponse.data.values || [];

    let mentorIndex = -1;

    // Step 3: Search for the mentor by email (Column B: index 1)
    rows.forEach((row, index) => {
      if (row[1] === email) {  // Column B: email
        mentorIndex = index;
      }
    });

    if (mentorIndex === -1) {
      return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
    }

    // Step 4: Fetch mentor data
    const mentorData = rows[mentorIndex];
    const fullName = mentorData[11];  // Column L: full_name (adjust column if needed)
    const gender = mentorData[12];
    const wa_number = mentorData[13];
    const role = mentorData[14];
    const affiliation = mentorData[15];
    const almamater = mentorData[16];
    const category = mentorData[17];
    const field_of_interest = mentorData[18];
    const description = mentorData[19];
    const linkedin_username = mentorData[20];
    const profile_picture = mentorData[21];

    // Return the mentor data
    return NextResponse.json({ fullName, gender, wa_number, role, affiliation, almamater, category, field_of_interest, description, linkedin_username, profile_picture }, { status: 200 });

  } catch (error) {
    console.error('Error fetching mentor data:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching mentor data.' },
      { status: 500 }
    );
  }
}
