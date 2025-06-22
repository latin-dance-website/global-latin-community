import { google } from "googleapis";

export default async function handler(req, res) {
  const { id, city } = req.query;

  if (!process.env.GOOGLE_SERVICE_ACCOUNT || !process.env.SHEET_ID) {
    return res.status(500).json({ message: "Missing required environment variables" });
  }

  try {
    // Parse service account credentials
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    } catch (jsonError) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT", jsonError);
      return res.status(500).json({ message: "Invalid service account credentials" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
    const spreadsheetId = process.env.SHEET_ID;
    const range = "Sheet1!A2:K";

    const response = await Promise.race([
      sheets.spreadsheets.values.get({ spreadsheetId, range }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Google Sheets timeout")), 7000)),
    ]);

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    if (!id && !city) {
      const carouselEvents = rows.map((row, index) => ({
        id: index + 1,
        title: row[2],
        date: row[4],
        startTime: row[5],
        endTime: row[6],
        fees: row[7],
        location: row[8],
        googleMapsLink: row[9],
        image: row[10] || "/assets/images/default-event.jpg",
        buttonColor:
          index % 3 === 0 ? "#f63c80" : index % 3 === 1 ? "#a23cf6" : "#ff7c19",
      }));

      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
      return res.status(200).json(carouselEvents);
    }

    if (id && city) {
      const eventRow = rows.find((row) => row[1] === id && row[0] === city);
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
        endTime: eventRow[6],
        fees: eventRow[7],
        location: eventRow[8],
        googleMapsLink: eventRow[9],
        image: eventRow[10] || null,
      };
      return res.status(200).json(event);
    }

    if (city) {
      const cityEvents = rows
        .filter((row) => row[0] === city)
        .map((row) => ({
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
    console.error("Error fetching events:", error.message, error);
    return res.status(500).json({ message: "Error fetching events" });
  }
}
