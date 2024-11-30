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
  const range = 'mentor-account!A2:W'; // Adjust this based on your sheet's actual range

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
      profile_updated_at: row[10],
      full_name: row[11],
      gender: row[12],
      wa_number: row[13],
      role: row[14],
      affiliation: row[15],
      almamater: row[16],
      category: row[17],
      field_of_interest: row[18],
      description: row[19],
      linkedin_username: row[20],
      profile_picture: row[21],
      username: row[22],
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
