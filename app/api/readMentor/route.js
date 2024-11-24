import { google } from 'googleapis';

export const revalidate = 0; //revalidate api every 1 second
export async function GET() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const range = 'mentors!A2:I'; // Adjust this based on your sheet's actual range

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 }); // Return empty array if no data
    }

    // Map the rows to an array of objects
    const data = rows.map((row) => ({
      Category: row[0],
      Photo: row[1],
      Name: row[2],
      Gender: row[3],
      Role: row[4],
      Affiliation: row[5],
      Linkedin: row[6],
      SubCat1: row[7],
      SubCat2: row[8],
      SubCat3: row[9],
    }));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // 'Cache-Control': 'public, s-maxage=1',
        // 'CDN-Cache-Control': 'public, s-maxage=60',
        // 'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}
