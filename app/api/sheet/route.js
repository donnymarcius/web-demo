import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,  // Access environment variable
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Correctly format private key
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],  // Read-only access
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;  // Access environment variable
    const range = 'Sheet1!A:C';  // Adjust as necessary for your columns

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (rows.length) {
      const data = rows.map((row) => ({
        name: row[0] || '',
        role: row[1] || '',
        affiliation: row[2] || '',
      }));
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'No data found.' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from Google Sheets' }, { status: 500 });
  }
}
