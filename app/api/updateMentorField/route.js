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

// Named export for POST
export async function POST(req) {
  const { email, field, value } = await req.json(); // Read the request body

  try {
    // Authenticate with Google Sheets
    const authClient = await authenticateGoogleSheets();

    // Step 1: Fetch the mentor data to find the row index
    const getResponse = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: 'mentor-account!A2:V',  // Assuming data is in columns A to V
    });

    const rows = getResponse.data.values || [];
    let mentorIndex = -1;

    // Find the row of the mentor based on email (assuming email is in column B)
    rows.forEach((row, index) => {
      if (row[1] === email) {  // Column B: email
        mentorIndex = index;
      }
    });

    if (mentorIndex === -1) {
      return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
    }

    // Step 2: Map field names to Google Sheets columns
    const fieldToColumn = {
      fullName: 11,  // Column L for fullName
      gender: 12,    // Column M for gender
      wa_number: 13, // Column N for wa_number
      role: 14,      // Column O for role
      affiliation: 15, // Column P for affiliation
      almamater: 16,  // Column Q for almamater
      category: 17,   // Column R for category
      field_of_interest: 18, // Column S for field_of_interest
      description: 19, // Column T for description
      linkedin_url: 20, // Column U for linkedin_url
      profile_picture: 21, // Column V for profile_picture
    };

    const columnIndex = fieldToColumn[field];

    if (columnIndex === undefined) {
      return NextResponse.json({ message: 'Invalid field name' }, { status: 400 });
    }

    // Step 3: Update the specified field in the mentor's row
    const updateResponse = await sheets.spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range: `mentor-account!${String.fromCharCode(65 + columnIndex)}${mentorIndex + 2}`, // Adjust for row and column
      valueInputOption: 'RAW',
      requestBody: {
        values: [[value]], // The value to update in the specified field
      },
    });

    // Optional: Log the response for debugging or logging purposes
    console.log('Update Response:', updateResponse);

    return NextResponse.json({ message: 'Field updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error updating mentor data:', error);
    return NextResponse.json({ message: 'An error occurred while updating mentor data.' }, { status: 500 });
  }
}
