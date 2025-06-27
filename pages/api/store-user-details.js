import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phone, instagram } = req.body;

  if (!email || !phone || !instagram) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Authenticate using environment variables
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await auth.authorize();

    const sheets = google.sheets({ version: 'v4', auth });

    // Append data
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, phone, instagram]],
      },
    });

    return res.status(200).json({ 
      message: 'User details stored successfully',
      response: response.data
    });
    
  } catch (error) {
    console.error('Google Sheets error:', error);
    return res.status(500).json({
      message: 'Failed to store user details',
      error: error.message,
    });
  }
}