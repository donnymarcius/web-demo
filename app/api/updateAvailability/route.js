import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import NextAuth from 'next-auth';

// Set up Google Sheets API client
const sheets = google.sheets('v4');
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID; // Your Google Sheets Spreadsheet ID

// Function to authenticate with Google Sheets API
const authenticateGoogleSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth.getClient();
};

export async function POST(req) {
  const { availability } = await req.json();

  // Validate request
  if (!availability || !availability.session_date || !availability.start_time || !availability.end_time) {
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }

  try {
    const authClient = await authenticateGoogleSheets();

    // Get the mentor's session (email and user info) from NextAuth
    const session = await getServerSession(NextAuth);

    // Ensure session is valid and mentor_id is present
    const mentorEmail = session?.user?.email; // Get mentor's email as the ID

    if (!mentorEmail) {
      return NextResponse.json({ message: 'Mentor ID not found or user not logged in' }, { status: 400 });
    }

    // Define the sheet range for Mentor Availability (adjust the sheet name accordingly)
    const sheetRange = 'availability!A2:G'; // Adjust to include columns A (availability_id) to G (created_at)

    // Fetch existing session data from Google Sheets
    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: sheetRange,
    });

    const rows = getResponse.data.values || [];

    // Generate unique availability_id based on existing data, or start from 0 if no records exist
    const nextAvailabilityId = rows.length > 0 
    ? Math.max(...rows.map(row => {
        const id = parseInt(row[0], 10); // Parse as integer
        return isNaN(id) ? -1 : id; // Return -1 if it can't be converted to a number (invalid value)
      })) + 1
    : 0;


    // Prepare new session data to append
    const newRow = [
      nextAvailabilityId,         // availability_id (unique, 0, 1, 2, etc.)
      mentorEmail,                   // mentor_id from session (using email as mentor id)
      availability.session_date,  // session_date
      availability.start_time,    // start_time
      availability.end_time,      // end_time
      false,                      // is_booked (initially false)
      new Date().toISOString(),   // created_at (timestamp of when the record was created)
    ];

    // Append new session to the sheet
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range: sheetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });

    return NextResponse.json({ message: 'Session added successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating mentor availability:', error);
    return NextResponse.json({ message: 'An error occurred while updating mentor availability', error: error.message }, { status: 500 });
  }
}
