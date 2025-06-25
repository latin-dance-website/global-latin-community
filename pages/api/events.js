import { parse } from "csv-parse/sync";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id, city } = req.query;

  const csvUrl = process.env.SHEET_CSV_URL;
  if (!csvUrl) {
    return res.status(500).json({
      message: "Server configuration error",
      details: "Missing SHEET_CSV_URL in .env",
    });
  }

  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();

    const records = parse(csvText, {
      columns: false,
      skip_empty_lines: true,
    });

    const rows = records.slice(1);

    if (!id && !city) {
      const carouselEvents = rows.map((row, index) => ({
  city: row[0] || "Unknown City",
  id: index + 1,
  title: row[2] || "Untitled Event",
  description: row[3] || "",
  date: row[4] || "Date not specified",
  startTime: row[5] || "",
  endTime: row[6] || "",
  fees: row[7] || "Free",
  location: row[8] || "Location not specified",
  googleMapsLink: row[9] || "",
  image: row[10] || "/assets/images/default-event.jpg",
  musicRatio: row[11] || "50% Salsa, 30% Bachata, 20% Kizomba",
  currencySymbols: row[12] || "₹,₫,฿",
  instagramHandle: row[13] || null,
  day: row[14] || null, // <-- your new column here
  citybycountry: row[15] || null, // <-- your new column here
  buttonColor: ["#f63c80", "#a23cf6", "#ff7c19"][index % 3],
}));


      res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
      );
      return res.status(200).json(carouselEvents);
    }

    if (id && city) {
      const eventRow = rows.find(
        (row) =>
          String(row[1]).toLowerCase() === String(id).toLowerCase() &&
          String(row[0]).toLowerCase() === String(city).toLowerCase()
      );

      if (!eventRow) {
        return res.status(404).json({
          message: "Event not found",
          details: `No event found with ID ${id} in ${city}`,
        });
      }

      const event = {
        id: eventRow[1],
        city: eventRow[0] || "Unknown City",
        title: eventRow[2] || "Untitled Event",
        description: eventRow[3] || "",
        date: eventRow[4] || "Date not specified",
        startTime: eventRow[5] || "",
        endTime: eventRow[6] || "",
        fees: eventRow[7] || "Free",
        location: eventRow[8] || "Location not specified",
        googleMapsLink: eventRow[9] || "",
        image: eventRow[10] || null,
        musicRatio: eventRow[11] || "50% Salsa, 30% Bachata, 20% Kizomba",
        currencySymbols: eventRow[12] || "₹,₫,฿",
        instagramHandle: eventRow[13] || null,
        day: eventRow[14] || null,
        citybycountry: eventRow[15] || null,
      };

      return res.status(200).json(event);
    }

    if (city) {
      const cityEvents = rows
        .filter(
          (row) => String(row[0]).toLowerCase() === String(city).toLowerCase()
        )
        .map((row) => ({
          id: row[1],
          city: row[0],
          title: row[2] || "Untitled Event",
          description: row[3] || "",
          date: row[4] || "Date not specified",
          startTime: row[5] || "",
          endTime: row[6] || "",
          fees: row[7] || "Free",
          location: row[8] || "Location not specified",
          googleMapsLink: row[9] || "",
          image: row[10] || null,
          musicRatio: row[11] || "Ratio not specified",
          currencySymbols: row[12] || "Symbols not specified",
          instagramHandle: row[13] || null,
          day: row[14] || null,
          citybycountry: row[15] || null,
        }));

      if (cityEvents.length === 0) {
        return res.status(404).json({
          message: "No events found",
          details: `No events found for city: ${city}`,
        });
      }

      return res.status(200).json(cityEvents);
    }

    return res.status(400).json({
      message: "Invalid request",
      details: "Missing or invalid query parameters",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      message: "Internal server error",
      details: error.message,
    });
  }
}
