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

    const rows = records.slice(1); // skip headers

    const normalizeString = (str) =>
      String(str || "").trim().toLowerCase().replace(/\s+/g, '');

    // ➤ Case 1: Return all events
    if (!id && !city) {
      const carouselEvents = rows.map((row, index) => ({
        city: row[0] || "Unknown City",
        id: index + 1,
        day: row[1] || null,  // Added day field here
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
        citybycountry: row[15] || null,  // Fixed: moved to correct column
        countryFlag: row[16] || null,    // Fixed: moved to correct column
        buttonColor: ["#f63c80", "#a23cf6", "#ff7c19"][index % 3],
      }));

      res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
      );
      return res.status(200).json(carouselEvents);
    }

    // ➤ Case 2: Fetch specific event by ID and city
    if (id && city) {
      const searchId = parseInt(id);
      const searchCity = normalizeString(city);

      // Find by numeric ID (column index) and city
      const eventRow = rows.find((row, index) => 
        (index + 1) === searchId && 
        normalizeString(row[0]) === searchCity
      );

      if (!eventRow) {
        // Find all events for the city to show available IDs
        const cityEvents = rows
          .filter(row => normalizeString(row[0]) === searchCity)
          .map((row, index) => ({
            id: index + 1,
            city: row[0],
            day: row[1],
            title: row[2]
          }));

        return res.status(404).json({
          message: "Event not found",
          details: `No event found with ID ${id} in ${city}`,
          availableEvents: cityEvents,
          suggestion: cityEvents.length > 0 
            ? `Available events in ${city}: ${cityEvents.map(e => `#${e.id} ${e.day}`).join(', ')}`
            : `No events found in ${city}`
        });
      }

      // Success case - build response with proper ID
      const eventIndex = rows.indexOf(eventRow);
      const event = {
        id: eventIndex + 1, // Use 1-based index as ID
        city: eventRow[0],
        day: eventRow[1], // Day from column 1
        title: eventRow[2],
        description: eventRow[3],
        date: eventRow[4],
        startTime: eventRow[5],
        endTime: eventRow[6],
        fees: eventRow[7],
        location: eventRow[8],
        googleMapsLink: eventRow[9],
        image: eventRow[10],
        musicRatio: eventRow[11],
        currencySymbols: eventRow[12],
        instagramHandle: eventRow[13],
        citybycountry: eventRow[15],  // Fixed: moved to correct column
        countryFlag: eventRow[16]     // Fixed: moved to correct column
      };

      return res.status(200).json(event);
    }

    // ➤ Case 3: Filter by city only
    if (city) {
      const searchCityVariants = [
        city,
        city.replace(/i+$/, ''),
        city.replace(/i/g, '')
      ].map(normalizeString);

      const cityEvents = rows
        .filter(row => searchCityVariants.includes(normalizeString(row[0])))
        .map((row, index) => ({
          id: index + 1,  // Fixed: use array index + 1 instead of row[1]
          city: row[0],
          day: row[1],    // Day from column 1
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
          currencySymbols: row[12] || '₫',  // Fixed: was currencySymbol
          instagramHandle: row[13] || null,
          citybycountry: row[15] || null,   // Fixed: moved to correct column
          countryFlag: row[16] || null,     // Fixed: moved to correct column
        }));

      if (cityEvents.length === 0) {
        const allCities = [...new Set(rows.map(row => row[0]))];
        const suggestions = allCities.filter(c =>
          normalizeString(c).includes(normalizeString(city).slice(0, 4))
        ).slice(0, 3);

        return res.status(404).json({
          message: "No events found",
          details: `No events found for city: ${city}`,
          suggestions: suggestions.length
            ? {
                message: "Did you mean one of these cities?",
                cities: suggestions
              }
            : null
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