// app/api/updateMentorField/route.js
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

    // Fetch mentor data
    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: 'mentor-account!A2:V',
    });

    const rows = getResponse.data.values || [];

    // Find mentor by email
    let mentorIndex = -1;
    rows.forEach((row, index) => {
      if (row[1]?.toLowerCase().trim() === email.toLowerCase().trim()) {
        mentorIndex = index;
      }
    });

    if (mentorIndex === -1) {
      console.error(`Mentor with email ${email} not found.`);
      return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
    }

    // Field-to-column mapping
    const fieldToColumn = {
      fullName: 11,
      gender: 12,
      wa_number: 13,
      position: 14,
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
    const range = `mentor-account!${String.fromCharCode(65 + columnIndex)}${mentorIndex + 2}`;
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
    console.error('Error updating mentor data:', error);
    return NextResponse.json({ message: 'An error occurred while updating mentor data.' }, { status: 500 });
  }
}
