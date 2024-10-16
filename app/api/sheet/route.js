// import { google } from 'googleapis';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,  // Access environment variable
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Correctly format private key
//       },
//       scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],  // Read-only access
//     });

//     const sheets = google.sheets({ version: 'v4', auth });
//     const spreadsheetId = process.env.SPREADSHEET_ID;  // Access environment variable
//     const range = 'Sheet1!A2:I';  // Adjust as necessary for your columns

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range,
//     });

//     const rows = response.data.values;

//     if (rows.length) {
//       const data = rows.map((row) => ({
//         category: row[0] || '',
//         photo: row[1] || '',
//         name: row[2] || '',
//         role: row[3] || '',
//         affiliation: row[4] || '',
//         linkedin: row[5] || '',
//         subcat1: row[6] || '',
//         subcat2: row[7] || '',
//         subcat3: row[8] || '',
//       }));
//       return NextResponse.json(data);
//     } else {
//       return NextResponse.json({ message: 'No data found.' }, { status: 404 });
//     }
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch data from Google Sheets' }, { status: 500 });
//   }
// }

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!process.env.GOOGLE_CLIENT_EMAIL || !privateKey || !process.env.SPREADSHEET_ID) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Sheet1!A2:I'; // Adjust range as necessary

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    if (rows.length > 0) {
      const data = rows.map((row) => ({
        category: row[0] || '',
        photo: row[1] || '',
        name: row[2] || '',
        role: row[3] || '',
        affiliation: row[4] || '',
        linkedin: row[5] || '',
        subcat1: row[6] || '',
        subcat2: row[7] || '',
        subcat3: row[8] || '',
      }));
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'No data found.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Google Sheets' }, { status: 500 });
  }
}