// const express = require('express');
// const { google } = require('googleapis');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Google Sheets Configuration
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID; // Your Google Sheet ID

// // Service Account Authentication
// const auth = new google.auth.GoogleAuth({
//   credentials: {
//     type: "service_account",
//     project_id: process.env.GOOGLE_PROJECT_ID,
//     private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
//     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     client_id: process.env.GOOGLE_CLIENT_ID,
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`
//   },
//   scopes: SCOPES,
// });

// const sheets = google.sheets({ version: 'v4', auth });

// // Helper function to format timestamp
// const getCurrentTimestamp = () => {
//   return new Date().toLocaleString('en-US', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
//   });
// };

// // Initialize Google Sheet with headers
// const initializeSheet = async () => {
//   try {
//     const headers = [
//       'Timestamp',
//       'Name',
//       'Mobile Number',
//       'Email ID',
//       'Country',
//       'City',
//       'Address',
//       'Event Name',
//       'Event City',
//       'Day',
//       'Date',
//       'Event Description',
//       'Event Page Link',
//       'Start Time',
//       'End Time',
//       'Music Ratio',
//       'Currency',
//       'Fees',
//       'Location',
//       'Venue',
//       'Handle',
//       'Google Maps',
//       'Event Poster Link'
//     ];

//     // Check if the sheet already has headers
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: 'A1:W1',
//     });

//     if (!response.data.values || response.data.values.length === 0) {
//       // Add headers if they don't exist
//       await sheets.spreadsheets.values.update({
//         spreadsheetId: SPREADSHEET_ID,
//         range: 'A1',
//         valueInputOption: 'RAW',
//         resource: {
//           values: [headers],
//         },
//       });
//       console.log('Headers initialized in Google Sheet');
//     }
//   } catch (error) {
//     console.error('Error initializing sheet:', error);
//   }
// };

// // API endpoint to create event
// app.post('/api/create-event', async (req, res) => {
//   try {
//     const {
//       name,
//       mobileNumber,
//       mailId,
//       country,
//       city,
//       address,
//       eventName,
//       eventCity,
//       day,
//       date,
//       eventDescription,
//       eventPageLink,
//       startTime,
//       endTime,
//       musicRatio,
//       currency,
//       fees,
//       location,
//       venue,
//       handle,
//       googleMaps,
//       eventPosterLink
//     } = req.body;

//     // Validate required fields
//     const requiredFields = {
//       name, mobileNumber, mailId, country, city, address,
//       eventName, eventCity, day, date, eventDescription,
//       eventPageLink, startTime, endTime, musicRatio,
//       currency, fees, location, venue, handle,
//       googleMaps, eventPosterLink
//     };

//     const missingFields = Object.entries(requiredFields)
//       .filter(([key, value]) => !value || value.toString().trim() === '')
//       .map(([key]) => key);

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         error: 'Missing required fields',
//         missingFields
//       });
//     }

//     // Prepare data for Google Sheets
//     const timestamp = getCurrentTimestamp();
//     const rowData = [
//       timestamp,
//       name,
//       mobileNumber,
//       mailId,
//       country,
//       city,
//       address,
//       eventName,
//       eventCity,
//       day,
//       date,
//       eventDescription,
//       eventPageLink,
//       startTime,
//       endTime,
//       musicRatio,
//       currency,
//       fees,
//       location,
//       venue,
//       handle,
//       googleMaps,
//       eventPosterLink
//     ];

//     // Append data to Google Sheet
//     const result = await sheets.spreadsheets.values.append({
//       spreadsheetId: SPREADSHEET_ID,
//       range: 'A:W',
//       valueInputOption: 'RAW',
//       insertDataOption: 'INSERT_ROWS',
//       resource: {
//         values: [rowData],
//       },
//     });

//     console.log('Data successfully added to Google Sheet:', result.data);

//     // Send success response
//     res.status(200).json({
//       message: 'Event created successfully',
//       sheetResponse: result.data,
//       submittedData: {
//         timestamp,
//         ...req.body
//       }
//     });

//   } catch (error) {
//     console.error('Error creating event:', error);
//     res.status(500).json({
//       error: 'Internal server error',
//       message: error.message
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'Server is running' });
// });

// // Test Google Sheets connection
// app.get('/api/test-sheets', async (req, res) => {
//   try {
//     const response = await sheets.spreadsheets.get({
//       spreadsheetId: SPREADSHEET_ID,
//     });

//     res.status(200).json({
//       message: 'Google Sheets connection successful',
//       sheetTitle: response.data.properties.title
//     });
//   } catch (error) {
//     console.error('Google Sheets connection error:', error);
//     res.status(500).json({
//       error: 'Failed to connect to Google Sheets',
//       message: error.message
//     });
//   }
// });

// // Initialize the sheet when server starts
// initializeSheet();

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/health`);
//   console.log(`Test Sheets: http://localhost:${PORT}/api/test-sheets`);
// });

// module.exports = app;