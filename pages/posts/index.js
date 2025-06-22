import { google } from "googleapis";
import { useState } from "react";

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const range = 'Sheet1!A1:C'; // Adjust range as needed
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length < 2) {
    return { props: { data: [] } };
  }

  const headers = rows[0].slice(1); // skip A1 (row label "City")
  const dataByCity = {};

  headers.forEach((city, colIndex) => {
    dataByCity[city] = rows.slice(1).map(row => row[colIndex + 1]).filter(Boolean);
  });

  return {
    props: {
      dataByCity,
      cities: headers,
    },
  };
}

export default function Posts({ dataByCity, cities }) {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const events = dataByCity[selectedCity] || [];

  return (
    <div>
      <h1>Select City</h1>
      <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <h2>Events in {selectedCity}</h2>
      <ul>
        {events.map((event, i) => (
          <li key={i}>{event}</li>
        ))}
      </ul>
    </div>
  );
}
