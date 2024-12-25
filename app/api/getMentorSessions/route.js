import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import NextAuth from 'next-auth';

// Set up Google Sheets API client
const sheets = google.sheets('v4');
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

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

export async function GET(req) {
  const authClient = await authenticateGoogleSheets();
  const session = await getServerSession(NextAuth); // Get session info
  const mentorEmail = session?.user?.email;

  if (!mentorEmail) {
    return NextResponse.json({ message: 'Mentor email not found or user not logged in' }, { status: 400 });
  }

  const sheetRange = 'availability!A2:G'; // Specify the sheet and range

  try {
    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: sheetRange,
    });

    const rows = getResponse.data.values || [];
    
    // Filter rows by mentorEmail
    const filteredRows = rows.filter(row => row[1] === mentorEmail);

    const sessions = filteredRows.map(row => ({
      availability_id: row[0],
      mentorEmail: row[1],
      session_date: row[2],
      start_time: row[3],
      end_time: row[4],
      is_booked: row[5],
      created_at: row[6],
    }));

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching mentor sessions:', error);
    return NextResponse.json({ message: 'An error occurred while fetching mentor sessions', error: error.message }, { status: 500 });
  }
}
