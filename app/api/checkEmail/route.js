import { google } from 'googleapis';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      console.error('Email is required');
      return new Response(JSON.stringify({ exists: false, error: 'Email is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = 'mentee-account!B2:B';

    console.log(`Spreadsheet ID: ${spreadsheetId}`);
    console.log(`Google Auth Client Email: ${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}`);
    console.log('Range being accessed:', range);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log('Google Sheets API response:', response.data);

    const emails = response.data.values ? response.data.values.flat() : [];

    const exists = emails.includes(email);

    return new Response(JSON.stringify({ exists }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in checkEmail API route:', error.message, error.stack);

    return new Response(
      JSON.stringify({ exists: false, error: 'Failed to check email.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
