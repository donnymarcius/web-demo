import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Function to handle the GET request
export async function GET(req) {
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
    // Fetch all sessions
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'booking-session!A2:H',
    });

    const rows = getResponse.data.values || [];

    // Transform rows into a JSON response
    const sessions = rows.map(row => ({
      session_id: row[0],       // Assume index 0: session_id
      mentor_email: row[1],     // Assume index 1: mentor_email
      mentee_email: row[2],     // Assume index 2: mentee_email
      session_date: row[3],     // Assume index 3: session_date
      start_time: row[4],       // Assume index 4: start_time
      end_time: row[5],         // Assume index 5: end_time
      status: row[6],           // Assume index 6: status
      timestamp: row[7],        // Assume index 7: timestamp
    }));

    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch sessions', error: error.message },
      { status: 500 }
    );
  }
}

// Function to handle the POST request
export async function POST(req) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  // Parse request payload
  const { mentor_email, mentee_email, session_date, start_time, end_time, status } = await req.json();

  // Validate required fields
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

    // Append new session to the Google Sheets
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
