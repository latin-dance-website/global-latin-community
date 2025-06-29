import { google } from 'googleapis';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const {
    name, mobileNumber, mailId, country, city, address,
    eventName, eventCity, day, date, eventDescription, eventPageLink,
    startTime, endTime, musicRatio, currency, fees,
    location, venue, handle, googleMaps, eventPosterLink
  } = req.body;

  // Required fields validation
  if (!name || !mobileNumber || !mailId || !eventName || !eventCity || !date) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing required fields',
      missingFields: [
        ...(!name ? ['name'] : []),
        ...(!mobileNumber ? ['mobileNumber'] : []),
        ...(!mailId ? ['mailId'] : []),
        ...(!eventName ? ['eventName'] : []),
        ...(!eventCity ? ['eventCity'] : []),
        ...(!date ? ['date'] : [])
      ]
    });
  }

  try {
    // Authenticate with Google Sheets
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data with timestamp
    const rowData = [
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
      name, mobileNumber, mailId, country, city, address,
      eventName, eventCity, day, date, eventDescription, eventPageLink,
      startTime, endTime, musicRatio, currency, fees,
      location, venue, handle, googleMaps, eventPosterLink
    ];

    // Append to Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Sheet1!A:W',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Event created successfully! We will contact you soon.',
      data: response.data
    });

  } catch (error) {
    console.error('Google Sheets error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
}