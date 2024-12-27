import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import NextAuth from 'next-auth';

// Set up Google Sheets API client
const sheets = google.sheets('v4');
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

// Function to authenticate Google Sheets API client
const authenticateGoogleSheets = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth.getClient();
  } catch (error) {
    console.error('Error during Google Sheets authentication:', error);
    throw new Error('Failed to authenticate Google Sheets client');
  }
};

export async function GET() {
  try {
    const authClient = await authenticateGoogleSheets(); // Auth client for API
    const session = await getServerSession(NextAuth); // Get session info for the current user

    const mentorEmail = session?.user?.email;

    if (!mentorEmail) {
      // Return early if mentor email isn't found
      console.error('Mentor email is missing or user is not logged in');
      return NextResponse.json({ message: 'Mentor email not found or user not logged in' }, { status: 400 });
    }

    const sheetRange = 'availability!A2:G'; // Specify sheet range

    // Log the request to Google Sheets
    console.log(`Requesting data from Google Sheets at range ${sheetRange}`);

    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: sheetRange,
    });

    console.log('Google Sheets response:', getResponse); // Log full response data

    const rows = getResponse.data.values || [];
    console.log(`Received ${rows.length} rows from Google Sheets`);

    if (rows.length === 0) {
      console.warn('No rows returned from the Google Sheets API');
    }

    // Mapping the rows to sessions
    const sessions = rows.map((row) => ({
      availability_id: row[0], // Availability ID (row[0])
      mentorEmail: row[1],      // Mentor Email (row[1])
      session_date: row[2],     // Session Date (row[2])
      start_time: row[3],       // Start Time (row[3])
      end_time: row[4],         // End Time (row[4])
      is_booked: row[5],        // Is Booked (row[5])
      created_at: row[6],       // Created At (row[6])
    }));

    // Instead of filtering by mentorEmail, simply return all sessions
    console.log(`Returning ${sessions.length} total sessions.`);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching mentor sessions:', error);
    
    // Provide more detailed error information
    return NextResponse.json({ 
      message: 'An error occurred while fetching mentor sessions', 
      error: error.message,
      stack: error.stack // Capture stack trace to help debug the issue
    }, { status: 500 });
  }
}
