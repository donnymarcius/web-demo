// app/api/updateMenteeField/route.js
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

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
  const { email, field, value } = await req.json();

  if (!email || !field || value === undefined) {
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }

  try {
    const authClient = await authenticateGoogleSheets();

    // Fetch mentee data
    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: 'mentee-account!A2:V',
    });

    const rows = getResponse.data.values || [];

    // Find mentee by email
    let menteeIndex = -1;
    rows.forEach((row, index) => {
      if (row[1]?.toLowerCase().trim() === email.toLowerCase().trim()) {
        menteeIndex = index;
      }
    });

    if (menteeIndex === -1) {
      console.error(`Mentee with email ${email} not found.`);
      return NextResponse.json({ message: 'Mentee not found' }, { status: 404 });
    }

    // Field-to-column mapping
    const fieldToColumn = {
      fullName: 11,
      gender: 12,
      wa_number: 13,
      role: 14,
      affiliation: 15,
      almamater: 16,
      category: 17,
      field_of_interest: 18,
      description: 19,
      linkedin_username: 20,
      profile_picture: 21,
    };

    const columnIndex = fieldToColumn[field];
    if (columnIndex === undefined) {
      console.error(`Invalid field: ${field}`);
      return NextResponse.json({ message: 'Invalid field name' }, { status: 400 });
    }

    // Update field
    const range = `mentee-account!${String.fromCharCode(65 + columnIndex)}${menteeIndex + 2}`;
    console.log(`Updating field: ${field}, Range: ${range}, Value: ${value}`);

    const updateResponse = await sheets.spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[value]],
      },
    });

    console.log('Update successful:', updateResponse.data);

    return NextResponse.json({ message: 'Field updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error updating mentee data:', error);
    return NextResponse.json({ message: 'An error occurred while updating mentee data.' }, { status: 500 });
  }
}
