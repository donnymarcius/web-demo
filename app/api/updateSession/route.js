import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
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

  const { mentor_email, mentee_email, session_date, start_time, end_time, status } = await req.json();

  // Validate request fields
  if (!mentor_email || !mentee_email || !session_date || !start_time || !end_time || !status) {
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }

  try {
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'booking-session!A2:H',
    });

    const rows = getResponse.data.values || [];
    const lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
    let newSessionId = 1; // Default starting ID

    if (lastRow) {
      const lastId = parseInt(lastRow[0], 10); // Parse the last ID as an integer
      newSessionId = lastId + 1;
    }

    // Update the Google Sheets with the session data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'booking-session!A2:H', // Adjust range
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          newSessionId,             // session_id (unchanged)
          mentor_email,              // mentor_email (passed in request)
          mentee_email,              // mentee_email (from logged-in session)
          session_date,              // session_date
          start_time,                // start_time
          end_time,                  // end_time
          status,                    // status (to be updated)
          new Date().toISOString(),  // timestamp of when it's updated
        ]],
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
