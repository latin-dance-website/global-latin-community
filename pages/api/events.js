// pages/api/events.js
import { google } from "googleapis";

export default async function handler(req, res) {
  const { id, city } = req.query;

  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SHEET_ID;
    const range = "Sheet1!A2:K"; // Include all columns
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    // For carousel - get all events
    if (!id && !city) {
      const carouselEvents = rows.map((row, index) => ({
        id: index + 1,
        title: row[2], // Event Name
        date: row[4], // Date
        startTime: row[5], // Start Time
        endTime: row[6], // End Time
        location: row[8], // Location
        image: row[10] || "/assets/images/default-event.jpg", // Image URL
        buttonColor: index % 3 === 0 ? "#f63c80" : 
                   index % 3 === 1 ? "#a23cf6" : "#ff7c19"
      }));
      return res.status(200).json(carouselEvents);
    }

    // For social page - get single event by ID (day number)
    if (id && city) {
  const eventRow = rows.find(row => row[1] === id && row[0] === city);
  if (!eventRow) {
    return res.status(404).json({ message: "Event not found" });
  }
  const event = {
    id: eventRow[1],
    city: eventRow[0],
    day: eventRow[1],
    title: eventRow[2],
    description: eventRow[3],
    date: eventRow[4],
    startTime: eventRow[5],
    endTime: row[6],
    fees: row[7],
    location: row[8],
    googleMapsLink: row[9],
    image: row[10] || null,
  };
  return res.status(200).json(event);
}

    // For socials page - get all events for a city
    if (city) {
      const cityEvents = rows
        .filter(row => row[0] === city)
        .map(row => ({
          id: row[1],
          city: row[0],
          day: row[1],
          title: row[2],
          description: row[3],
          date: row[4],
          startTime: row[5],
          endTime: row[6],
          fees: row[7],
          location: row[8],
          googleMapsLink: row[9],
          image: row[10] || null,
        }));
      return res.status(200).json(cityEvents);
    }

    return res.status(400).json({ message: "Invalid request" });

  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ message: "Error fetching events" });
  }
}