import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { parse } from 'date-fns'; // For date handling

// Function to handle the POST request
export async function POST(req) {
  console.log('Received request to update session status');

  // Setup Google Sheets authentication
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/calendar'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  try {
    const { session_id, status, mentor_email, session_date, start_time, end_time } = await req.json();
    console.log('Parsed payload:', { session_id, status, mentor_email, session_date, start_time });

    // Validate payload
    if (!session_id || !status || !mentor_email || !session_date || !start_time || !end_time) {
      console.error('Invalid payload:', { session_id, status, mentor_email, session_date, start_time, end_time });
      return NextResponse.json(
        { message: 'Invalid request payload. Ensure session_id, status, mentor_email, session_date, start_time, and end_time are provided.' },
        { status: 400 }
      );
    }

    // Fetch rows from the spreadsheet
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'booking-session!A2:H',
    });

    const rows = getResponse.data.values || [];
    console.log('Retrieved rows:', rows);

    // Locate the specific session to update
    const sessionIndex = rows.findIndex(
      row => parseInt(row[0], 10) === parseInt(session_id, 10)
    );
    console.log('Session index:', sessionIndex);

    if (sessionIndex === -1) {
      console.error('Session not found for session_id:', session_id);
      return NextResponse.json(
        { message: `Session with id ${session_id} not found.` },
        { status: 404 }
      );
    }

    // Update the status in the specific session
    rows[sessionIndex][6] = status; // Column G (index 6) holds the status
    console.log('Updated row for session_id:', rows[sessionIndex]);

    // If the session is approved, check for conflicts and create Google Calendar event
    if (status === 'Approved') {
      const startDateTime = new Date(`${session_date}T${start_time}`);
      const endDateTime = new Date(`${session_date}T${end_time}`);
      
      const calendarEvents = await getCalendarEvents(auth, startDateTime, endDateTime); // Pass auth here

      if (calendarEvents.length > 0) {
        console.log('Conflict detected with existing calendar events');
        return NextResponse.json({ message: 'Conflict detected with existing events. Please choose another time.' }, { status: 400 });
      }

      // Create a Google Calendar event
      const calendarEvent = await createCalendarEvent(auth, mentor_email, startDateTime, endDateTime, `Session with ${mentor_email}`, session_id); // Pass auth here
      console.log('Google Calendar event created:', calendarEvent);

      // Reject conflicting sessions in Google Sheets
      rows.forEach((row, index) => {
        if (
          index !== sessionIndex &&
          row[1] === mentor_email && // Column B (index 1) holds the mentor_email
          row[3] === session_date && // Column D (index 3) holds the session_date
          row[4] === start_time && // Column E (index 4) holds the start_time
          row[5] === end_time // Column F (index 5) holds the end_time
        ) {
          row[6] = 'Rejected'; // Update status to Rejected
          console.log('Rejected conflicting session:', row);
        }
      });
    }

    // Push all updated rows back to Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'booking-session!A2:H',
      valueInputOption: 'RAW',
      requestBody: {
        values: rows,
      },
    });

    console.log('Session statuses successfully updated');
    return NextResponse.json({ message: 'Session updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the session.', error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to get Google Calendar events within a time range
async function getCalendarEvents(auth, startDateTime, endDateTime) {
  const calendar = google.calendar({ version: 'v3', auth });

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDateTime.toISOString(),
    timeMax: endDateTime.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  return res.data.items || [];
}

// Helper function to create a Google Calendar event
async function createCalendarEvent(auth, mentor_email, startDateTime, endDateTime, summary, session_id) {
  const event = {
    summary: summary,
    description: `Session ID: ${session_id}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Asia/Kolkata', // Set the timezone based on your region
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: mentor_email },
    ],
    conferenceData: {
      createRequest: {
        requestId: session_id.toString(),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await google.calendar({ version: 'v3', auth }).events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data;
}
