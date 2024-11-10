import { google } from 'googleapis';

export async function POST(req) {
  // Parse the form data sent from the client
  const { username, email, password } = await req.json();

  // Authenticate with Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix escaped newlines
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const range = 'account!A2:C'; // Adjust this based on your sheet's actual range

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
      valueInputOption: 'RAW', // You can use 'RAW' or 'USER_ENTERED' for the input type
      requestBody: {
        values: [[username, email, password]], // The values to append
      },
    });

    return new Response(JSON.stringify({ success: true, message: 'User registered successfully.' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to register user.' }), {
      status: 500,
    });
  }
}
