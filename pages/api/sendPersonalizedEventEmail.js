import fetch from "node-fetch";
import nodemailer from "nodemailer";
import fs from "fs";
import dayjs from "dayjs";

function saveEmailPreview(html, filename = "preview.html") {
  if (process.env.NODE_ENV === "development") {
    const fs = require("fs");
    fs.writeFileSync(filename, html, "utf8");
    console.log(
      `✅ Email preview saved as ${filename}. Open it in your browser.`
    );
  } else {
    console.log("📧 Email preview generated (not saved in production)");
  }
}

const generateEventCardHTML = (event) => {
  const formattedDate = event.formattedDate || `${event.day}, ${event.shortDate}`;
  const formattedTime = `${event.startTime}-${event.endTime}`;
  const formattedPrice = event.fees 
    ? `${event.currencySymbols || "₫"}${event.fees.toLocaleString()}`
    : "FREE";

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="
      width: 100%;
      max-width: 340px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    ">
      <tr>
        <td style="padding: 0;">
          <table cellpadding="0" cellspacing="0" border="0" style="
            width: 100%;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border: 1px solid #e8e8e8;
            border-collapse: collapse;
            overflow: hidden;
          ">
            
            <!-- IMAGE ROW -->
            <tr>
              <td style="padding: 0; line-height: 0;">
                <img src="${event.image}" alt="${event.title}" style="
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  object-position: center top;
                  display: block;
                  border: 0;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
                " width="340" height="200" />
              </td>
            </tr>

            <!-- CONTENT ROW -->
            <tr>
              <td style="padding: 12px 15px 15px 15px;">
                
                <!-- TITLE -->
                <div style="
                  font-size: 16px;
                  font-weight: 800;
                  color: #000000;
                  line-height: 1.3;
                  margin: 0 0 10px 0;
                  text-align: center;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                  ${event.title || "Event Title"}
                </div>

                <!-- DETAILS - Using spans instead of table for better Gmail compatibility -->
                <div style="text-align: left;">
                  
                  <!-- Date Row -->
                  <div style="margin-bottom: 5px; line-height: 1.2;">
                    <span style="
                      font-size: 14px;
                      margin-right: 6px;
                      display: inline-block;
                      vertical-align: top;
                    ">📅</span><span style="
                      font-size: 13px;
                      color: #2c3e50;
                      font-weight: 700;
                      vertical-align: top;
                    ">${formattedDate}</span>
                  </div>

                  <!-- Time Row -->
                  <div style="margin-bottom: 5px; line-height: 1.2;">
                    <span style="
                      font-size: 14px;
                      margin-right: 6px;
                      display: inline-block;
                      vertical-align: top;
                    ">⏰</span><span style="
                      font-size: 13px;
                      color: #2c3e50;
                      font-weight: 700;
                      vertical-align: top;
                    ">${formattedTime}</span>
                  </div>

                  <!-- Music Ratio Row -->
                  <div style="margin-bottom: 5px; line-height: 1.2;">
                    <span style="
                      font-size: 14px;
                      margin-right: 6px;
                      display: inline-block;
                      vertical-align: top;
                    ">🎵</span><span style="
                      font-size: 13px;
                      color: #2c3e50;
                      font-weight: 700;
                      vertical-align: top;
                    ">${event.musicRatio || "1:1"}</span>
                  </div>

                  <!-- Price Row -->
                  <div style="margin-bottom: 5px; line-height: 1.2;">
                    <span style="
                      font-size: 14px;
                      margin-right: 6px;
                      display: inline-block;
                      vertical-align: top;
                    ">💰</span><span style="
                      font-size: 12px;
                      color: ${event.fees ? "#e74c3c" : "#27ae60"};
                      font-weight: 700;
                      background: ${event.fees ? "rgba(231, 76, 60, 0.1)" : "rgba(39, 174, 96, 0.1)"};
                      padding: 2px 8px;
                      border-radius: 10px;
                      display: inline-block;
                      vertical-align: top;
                    ">${formattedPrice}</span>
                  </div>

                  <!-- Location Row -->
                  <div style="margin-bottom: 0; line-height: 1.2;">
                    <span style="
                      font-size: 14px;
                      margin-right: 6px;
                      display: inline-block;
                      vertical-align: top;
                    ">📍</span><span style="
                      font-size: 13px;
                      color: #2c3e50;
                      font-weight: 700;
                      vertical-align: top;
                      word-wrap: break-word;
                      display: inline-block;
                      max-width: 280px;
                    ">${event.location.replace(/,/g, ", ")}</span>
                  </div>

                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

const generateEmailHTML = (events, city, userDetails, startDate, endDate) => {
  const visibleEvents = events.slice(0, 2);
  const hasMoreEvents = events.length > 2;

  const generateMoreEventsButton = (city, userDetails) => {
    const exploreUrl = `https://www.globallatindancecommunity.com/events/display?city=${encodeURIComponent(
    city
  )}&startDate=${userDetails.startDate}&endDate=${userDetails.endDate}`;
    return `
      <div style="text-align: center; margin-top: 30px;">
        <a href="${exploreUrl}"
           style="
             background-color: #f63c80;
             color: white;
             text-decoration: none;
             padding: 12px 24px;
             border-radius: 30px;
             font-size: 14px;
             font-weight: bold;
             display: inline-block;
             font-family: Arial, sans-serif;
           ">
           🔥 Explore More Events
        </a>
      </div>
    `;
  };

  const moreEventsButtonHTML = hasMoreEvents
    ? generateMoreEventsButton(city, userDetails)
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Personalized Latin Dance Events</title>
      <style type="text/css">
        @media screen and (max-width: 600px) {
          .event-cards-row td {
            width: 50% !important;
            padding: 0 5px !important;
          }
          .event-card-container table {
            max-width: 100% !important;
            font-size: 11px !important;
          }
          .event-card-container h3 {
            font-size: 13px !important;
          }
          .event-card-container img {
            height: 120px !important;
          }
          .header-title {
            font-size: 20px !important;
            line-height: 1.2 !important;
            margin-bottom: 5px !important;
          }
          .header-subtitle {
            margin-top: 5px !important;
            margin-bottom: 10px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      
      <!-- Main Container -->
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto; background: white;">
        
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px 20px 15px; text-align: center; color: white;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="text-align: center;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 700; line-height: 1.2; color: white; font-family: Arial, sans-serif;" class="header-title">
                    Thanks for registering to
                  </h1>
                  <h1 style="margin: 0; font-size: 22px; font-weight: 700; line-height: 1.2; color: white; font-family: Arial, sans-serif;" class="header-title">
                    Global Latin Dance Community!
                  </h1>
                  <p style="margin: 8px 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, sans-serif; font-style: italic;" class="header-subtitle">
                    Your personalised latin dance events for ${city} ✨
                  </p>
                  <div style="background: rgba(255,255,255,0.15); padding: 10px 15px; border-radius: 20px; display: inline-block; max-width: 90%;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; font-family: Arial, sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      Curated just for you from ${startDate} - ${endDate}
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Events Section -->
        <tr>
          <td style="padding: 20px 15px; background: white;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 20px;">
              <tr><td style="text-align: center;"></td></tr>
            </table>

            <!-- Events Grid (2 cards side by side) -->
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
              <tr class="event-cards-row">
                ${visibleEvents
                  .map(
                    (event, index) => `
                      <td style="width: 50%; padding: 0 10px; vertical-align: top;">
                        <div class="event-card-container">
                          ${generateEventCardHTML(event)}
                        </div>
                      </td>
                    `
                  )
                  .join("")}
                ${visibleEvents.length === 1 ? '<td style="width: 50%;"></td>' : ""}
              </tr>
            </table>

            <!-- Explore More Events Button -->
            ${moreEventsButtonHTML}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding: 20px; text-align: center; background: #2d3748; color: white;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="text-align: center; margin-bottom: 15px;">
                  <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: white; font-family: Arial, sans-serif;">
                    Stay Connected with the Latin Dance Community! 💃🕺
                  </h4>
                  <p style="margin: 0 0 15px 0; font-size: 12px; color: rgba(255,255,255,0.8); font-family: Arial, sans-serif;">
                    Follow us for daily dance tips, events, and community updates
                  </p>
                </td>
              </tr>

              <tr>
                <td style="text-align: center;">
                  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                    <tr>
                      <td style="width: 48%; text-align: center;">
                        <a href="#" style="display: inline-block; width: 90%; padding: 10px; background: #667eea; color: white; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: 600; font-family: Arial, sans-serif;">
                          📱 Follow Us
                        </a>
                      </td>
                      <td style="width: 4%;"></td>
                      <td style="width: 48%; text-align: center;">
                        <a href="https://www.globallatindancecommunity.com" style="display: inline-block; width: 90%; padding: 10px; background: #ff6b35; color: white; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: 600; font-family: Arial, sans-serif;">
                          🌐 Visit Website
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="text-align: center; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
                  <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; font-family: Arial, sans-serif;">
                    You're receiving this because you registered for Global Latin Dance Community.<br/>
                    Keep dancing and spreading the love! 💖
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};


export async function sendPersonalizedEventEmail(events, city, userDetails) {
  const { startDate, endDate } = userDetails;
  const start = userDetails.startDate
    ? dayjs(userDetails.startDate).format("DD MMMM")
    : "";
  const end = userDetails.endDate
    ? dayjs(userDetails.endDate).format("DD MMMM")
    : "";
  const htmlContent = generateEmailHTML(events, city, userDetails, start, end);

  saveEmailPreview(htmlContent);

  const textContent = `
🎉 Welcome to Global Latin Dance Community!

Thanks for registering! Here are your personalized upcoming events calendar in ${city}:

${events
  .slice(0, 2)
  .map(
    (event) => `
🎵 Event: ${event.title || "Latin Dance Event"}
📅 Date: ${event.formattedDate || event.day + ", " + event.shortDate}
⏰ Time: ${event.startTime}:${event.endTime}hrs
💰 Price: ${event.fees ? `₫${event.fees.toLocaleString()}` : "Free"}
🎶 Music: ${event.musicRatio || "Mixed"}
📍 Location: ${event.location}
---`
  )
  .join("")}

${events.length > 2 ? "🚀 Discover more amazing events on our website!" : ""}

We've curated verified Salsa 💃, Bachata 🎵, Kizomba 🎶 & Zouk 🎼 events just for you!

Stay connected with the dance community!
`;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    if (!userDetails.email || !userDetails.email.trim()) {
      console.error(
        "❌ Email not sent: userDetails.email is missing or empty",
        userDetails
      );
      return { success: false, error: "Recipient email is missing" };
    }

    const mailOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: userDetails.email,
      subject: `💃🕺 Your Personalized Latin Dance Events in ${city} - Let's Dance!`,
      text: textContent,
      html: htmlContent,
    };

    console.log("Sending email with options:", mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully via SMTP");

    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email via Nodemailer:", {
      message: error.message,
      stack: error.stack,
      full: error,
    });
    return { success: false, error: error.message };
  }
}

export default sendPersonalizedEventEmail;
