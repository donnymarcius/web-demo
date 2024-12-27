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
  const { session_id, mentee_email, session_date, start_time, end_time, status } = await req.json();

  // Validate request fields
  if (!session_id || !mentee_email || !session_date || !start_time || !end_time || !status) {
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }

  try {
    const authClient = await authenticateGoogleSheets();

    // Get the logged-in mentor's session using NextAuth
    const session = await getServerSession(NextAuth);

    // Ensure session is valid and mentor_email is present
    const mentorEmail = session?.user?.email; // Get the mentor's email

    if (!mentorEmail) {
      return NextResponse.json({ message: 'Mentor not logged in or session expired' }, { status: 401 });
    }

    // Define the sheet range for booking session
    const sheetRange = 'booking-session!A2:H'; // Sheet name: 'booking-session' and column range

    // Fetch all sessions from Google Sheets to check if the session exists
    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: sheetRange,
    });

    const rows = getResponse.data.values || [];

    // Find the row corresponding to the session_id
    const sessionRowIndex = rows.findIndex(row => row[0] === session_id.toString());

    if (sessionRowIndex === -1) {
      return NextResponse.json({ message: 'Session not found' }, { status: 404 });
    }

    // Prepare the updated row with new values
    const updatedRow = [
      session_id,               // session_id (unchanged)
      mentorEmail,              // mentor_email (from session)
      mentee_email,             // mentee_email (to be updated)
      session_date,             // session_date (to be updated)
      start_time,               // start_time (to be updated)
      end_time,                 // end_time (to be updated)
      status,                   // status (to be updated)
      new Date().toISOString(), // updated_at (timestamp for when it's updated)
    ];

    // Define the range to update the existing row (sheet range where the session data exists)
    const updateRange = `booking-session!A${sessionRowIndex + 2}:H${sessionRowIndex + 2}`; 

    // Update the row in Google Sheets with the new session values
    await sheets.spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [updatedRow],
      },
    });

    return NextResponse.json({ message: 'Session updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the session', error: error.message },
      { status: 500 }
    );
  }
}
