import { sendEmail } from "./sendMail"; // adjust path as needed

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { to, formData } = req.body;

  if (!to || !formData) {
    return res.status(400).json({ message: "Missing email or form data" });
  }

  // Extract events from formData
  const { events } = formData;
  console.log('evets',events);
  
  
  if (!events || events.length === 0) {
    return res.status(400).json({ message: "No events data provided" });
  }

  // Generate the event schedule HTML
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
          }
          h2 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
          }
          .schedule {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .event {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .event h3 {
            color: #e74c3c;
            font-size: 18px;
          }
          .event p {
            color: #555;
            font-size: 14px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
          }
          .button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <h2>Event Schedule</h2>
        <div class="schedule">
          ${events.map((event, index) => {
            const day = index + 1;
            return `
              <div class="event">
                <h3>Day ${day}</h3>
                <p><strong>Event:</strong> ${event}</p>
                <p><strong>Date:</strong> ${formatDate(day)}</p>
                <p><strong>Time:</strong> 18:00</p>
              </div>
            `;
          }).join("")}
        </div>
        <div class="footer">
          <p>If you would like to add these events to your calendar, click below:</p>
          <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Event+Schedule&dates=20250601T180000Z/20250601T190000Z&details=Join+us+for+the+events" class="button">Add to Calendar</a>
        </div>
      </body>
    </html>
  `;

  try {
    await sendEmail({
      to,
      subject: "Event Registration Confirmation",
      text: JSON.stringify(formData),
      html,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email" });
  }
}

// Helper function to format dates for the event
function formatDate(day) {
  const startDate = new Date('2025-06-01'); // Starting from June 1, 2025
  const eventDate = new Date(startDate);
  eventDate.setDate(startDate.getDate() + (day - 1)); // Adjusting for the day number

  return eventDate.toLocaleDateString(); // Formats the date to 'MM/DD/YYYY'
}
