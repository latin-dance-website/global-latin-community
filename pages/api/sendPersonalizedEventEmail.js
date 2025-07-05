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

const generateEventCardHTML = (event, index) => {
  const formattedDate = event.formattedDate || `${event.day}, ${event.shortDate}`;
  const formattedTime = `${event.startTime}-${event.endTime}`;
  const formattedPrice = event.fees 
    ? `${event.currencySymbols || "₫"}${event.fees.toLocaleString()}`
    : "FREE";

  const normalizedCity = event.city.trim().toLowerCase();
  const eventLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/events/${normalizedCity}/${event.id}`;

  return `
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="320">
    <tr>
    <td width="320" valign="top" style="padding:0 6px 16px 6px;">
    <![endif]-->
    <div class="event-card" style="
      width: 100%;
      max-width: 320px;
      margin: 0 auto 16px auto;
      box-sizing: border-box;
      vertical-align: top;
    ">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
        border-collapse: collapse; 
        mso-table-lspace: 0pt; 
        mso-table-rspace: 0pt; 
        background: #ffffff; 
        border-radius: 12px; 
        box-shadow: 0 6px 20px rgba(0,0,0,0.12); 
        border: 1px solid #e2e8f0;
        table-layout: fixed;
      ">
        <!-- Event Image -->
        <tr>
          <td style="position: relative;">
            <img src="${event.image}" width="320" style="
              width: 100%; 
              max-width: 320px; 
              height: 160px; 
              object-fit: cover; 
              border: 0; 
              outline: none; 
              display: block;
              border-radius: 12px 12px 0 0;
            " alt="${event.title}" />
          </td>
        </tr>

        <!-- Event Content -->
        <tr>
          <td style="padding: 16px 16px 12px 16px;">
            <!-- Event Title -->
            <h3 style="
              margin: 0 0 12px 0; 
              font-size: 16px; 
              font-weight: 700; 
              color: #2d3748; 
              line-height: 1.3;
              text-align: center;
            ">
              ${event.title || "Event Title"}
            </h3>

            <!-- Book Tickets Button -->
            <div style="margin-bottom: 16px;">
              <a href="${eventLink}" style="
                display: block;
                background: linear-gradient(135deg, #8A2BE2 0%, #FF69B4 100%);
                color: white;
                text-align: center;
                padding: 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 700;
                text-decoration: none;
                transition: all 0.3s ease;
              " target="_blank">
                BOOK TICKETS
              </a>
            </div>

            <!-- Metadata + Location using Table for Alignment -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width: 100%; font-size: 12px; font-family: sans-serif; font-weight: 500; color: #2d3748; margin-bottom: 8px;">
              <tr>
                <!-- Date -->
                <td style="padding: 2px 8px 2px 0; white-space: nowrap; width: 30%;">
                  <div style="display: inline-flex; align-items: center; gap: 8px;">
                    <img src="https://www.globallatindancecommunity.com/assets/icons/calendar.png" alt="Calendar" width="14" height="14" style="vertical-align: middle;" />
                    ${formattedDate}
                  </div>
                </td>

                <!-- Time -->
                <td style="padding: 2px 8px; white-space: nowrap; width: 30%;">
                  <div style="display: inline-flex; align-items: center; gap: 8px;">
                    <img src="https://www.globallatindancecommunity.com/assets/icons/clock.png" alt="Time" width="14" height="14" style="vertical-align: middle;" />
                    ${formattedTime}
                  </div>
                </td>

                <!-- Fees -->
                <td style="padding: 2px 0; white-space: nowrap; width: 40%;">
                  <div style="display: inline-flex; align-items: center; gap: 8px;">
                    <span style="
                      display: inline-block;
                      width: 14px;
                      height: 14px;
                      font-size: 14px;
                      color: #805AD5;
                      text-align: center;
                      line-height: 14px;
                    ">
                      ${event.currencySymbols || '₫'}
                    </span>
                    <span style="color: #000000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90px; display: inline-block;">
                      ${event.fees ? event.fees.toLocaleString() : 'FREE'}
                    </span>
                  </div>
                </td>
              </tr>

              <!-- Location -->
              <tr>
                <td colspan="3" style="padding-top: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="https://www.globallatindancecommunity.com/assets/icons/location.png" alt="Location" width="14" height="14" style="flex-shrink: 0;" />
                    <a href="${event.googleMapsLink}" target="_blank" style="
                      text-decoration: underline;
                      color: #2d3748;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: inline-block;
                      width: 80%;
                      vertical-align: middle;
                    ">
                      ${event.location.replace(/,/g, ", ")}
                    </a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    <![endif]-->
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
      <div style="text-align: center; margin: 24px 0;">
        <a href="${exploreUrl}" style="
          display: inline-block;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 700;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          box-shadow: 0 6px 20px rgba(238, 90, 36, 0.3);
          transition: all 0.3s ease;
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
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>Your Personalized Latin Dance Events</title>
      
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      
      <style type="text/css">
        /* Reset styles */
        table, td, div, h1, h2, h3, h4, h5, h6, p {
          margin: 0;
          padding: 0;
        }
        
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
        
        table {
          border-collapse: collapse !important;
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
          line-height: 100%;
        }
        
        /* Mobile styles - cards stacked vertically */
        @media screen and (max-width: 600px) {
          .mobile-center {
            text-align: center !important;
          }
          
          .mobile-full-width {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .mobile-padding {
            padding: 20px 10px !important;
          }
          
          .header-title {
            font-size: 20px !important;
            line-height: 1.2 !important;
          }
          
          .header-subtitle {
            font-size: 13px !important;
          }
          
          .events-container {
            display: block !important;
            padding: 0 5px !important;
          }
          
          .event-card {
            width: 100% !important;
            max-width: 260px !important;
            margin: 0 auto 16px auto !important;
          }
          
          .event-card table {
            width: 100% !important;
          }
          
          .event-image {
            height: 120px !important;
          }
          
          .event-title {
            font-size: 13px !important;
          }
          
          .event-details {
            font-size: 9px !important;
          }
          
          .footer-buttons {
            width: 100% !important;
            margin-bottom: 12px !important;
          }
          
          .footer-button {
            width: 100% !important;
            margin-bottom: 10px !important;
            font-size: 14px !important;
            padding: 14px 20px !important;
          }
          
          .footer-icon {
            font-size: 16px !important;
            margin-right: 8px !important;
          }
        }
        
        /* Smaller mobile screens */
        @media screen and (max-width: 400px) {
          .container {
            width: 100% !important;
            min-width: 100% !important;
          }
          
          .header-title {
            font-size: 18px !important;
          }
          
          .header-subtitle {
            font-size: 12px !important;
          }
          
          .event-title {
            font-size: 12px !important;
          }
          
          .event-details {
            font-size: 8px !important;
          }
        }
        
        /* Desktop styles - cards side by side */
        @media screen and (min-width: 601px) {
          .events-container {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 12px !important;
            padding: 0 10px !important;
          }
          
          .event-card {
            flex: 1 1 calc(50% - 12px) !important;
            max-width: 260px !important;
            min-width: 240px !important;
            margin: 0 6px 16px 6px !important;
          }
          
          .event-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(0,0,0,0.15);
          }
        }
      </style>
    </head>
    
    <body style="
      margin: 0;
      padding: 0;
      width: 100% !important;
      min-width: 100%;
      background: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    ">
      
      <!-- Preheader text -->
      <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #667eea;">
        Your personalized Latin dance events for ${city} are here! 💃🕺
      </div>
      
      <!-- Main Container -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding: 0px 0;">
            
            <!-- Email Container -->
            <table role="presentation" class="container" cellpadding="0" cellspacing="0" border="0" width="600" style="
              width: 600px;
              max-width: 600px;
              background-color: #ffffff;
              margin: 0 auto;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            ">
<!-- Header -->
<tr>
  <td style="
    padding: 0;
    text-align: center;
    background: linear-gradient(135deg, #8A2BE2 0%, #FF69B4 100%);
    color: white;
  ">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="padding: 28px 30px 20px 30px;">
          <h1 style="
            margin: 0 0 2px 0;
            font-size: 20px;
            font-weight: 800;
            line-height: 1.3;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            white-space: nowrap;
          ">
            Thanks for registering to
          </h1>
          <h1 style="
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 800;
            line-height: 1.3;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            white-space: nowrap;
          ">
            Global Latin Dance Community!
          </h1>
          <p style="
            margin: 0 0 12px 0;
            font-size: 15px;
            color: rgba(255,255,255,0.9);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            font-weight: 500;
            font-style: italic;
            white-space: nowrap;
          ">
            Your personalised latin dance events for ${city} ✨
          </p>

          <div style="
            background: rgba(255,255,255,0.2);
            padding: 10px 18px;
            border-radius: 30px;
            display: inline-block;
            max-width: 90%;
            border: 1px solid rgba(255,255,255,0.3);
            white-space: nowrap;
          ">
            <p style="
              margin: 0;
              font-size: 14px;
              font-weight: 700;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              color: white;
            ">
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
                <td style="
                  padding: 30px 15px;
                  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                " class="mobile-padding">
                  
                  <!-- Events Container -->
                  <div class="events-container" style="
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 12px;
                    padding: 0 10px;
                  ">
                    ${visibleEvents.map((event, index) => generateEventCardHTML(event, index)).join('')}
                  </div>

                  <!-- Explore More Events Button -->
                  ${moreEventsButtonHTML}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  padding: 35px 25px;
                  text-align: center;
                  background: #1a202c;
                  color: #ffffff;
                " class="mobile-padding">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: center; padding-bottom: 25px;">
                        <h4 style="
                          margin: 0 0 12px 0;
                          font-size: 20px;
                          font-weight: 700;
                          color: #ffffff;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                        ">
                          Stay Connected with the Latin Dance Community! 💃🕺
                        </h4>
                        <p style="
                          margin: 0;
                          font-size: 15px;
                          color: rgba(255,255,255,0.85);
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                          line-height: 1.5;
                        ">
                          Follow us for daily dance tips, events, and community updates
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="text-align: center;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                        <td style="vertical-align:top;width:280px;">
                        <![endif]-->
                        <div style="display: inline-block; vertical-align: top; width: 48%; max-width: 260px; margin: 0 1%;" class="footer-buttons">
                          <a href="#" style="
                            display: block;
                            width: 100%;
                            padding: 16px 24px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 30px;
                            font-size: 15px;
                            font-weight: 700;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                            box-sizing: border-box;
                            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                            transition: all 0.3s ease;
                          " class="footer-button">
                            <span class="footer-icon" style="font-size: 18px; margin-right: 10px;">📱</span>Follow Us
                          </a>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                        <td style="vertical-align:top;width:280px;">
                        <![endif]-->
                        <div style="display: inline-block; vertical-align: top; width: 48%; max-width: 260px; margin: 0 1%;" class="footer-buttons">
                          <a href="https://www.globallatindancecommunity.com" style="
                            display: block;
                            width: 100%;
                            padding: 16px 24px;
                            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 30px;
                            font-size: 15px;
                            font-weight: 700;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                            box-sizing: border-box;
                            box-shadow: 0 4px 15px rgba(238, 90, 36, 0.3);
                            transition: all 0.3s ease;
                          " class="footer-button">
                            <span class="footer-icon" style="font-size: 18px; margin-right: 10px;">🌐</span>Visit Website
                          </a>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>

                    <tr>
                      <td style="
                        text-align: center;
                        padding-top: 25px;
                        border-top: 1px solid rgba(255,255,255,0.2);
                      ">
                        <p style="
                          margin: 0;
                          font-size: 13px;
                          color: rgba(255,255,255,0.7);
                          line-height: 1.5;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                        ">
                          You're receiving this because you registered for Global Latin Dance Community.<br/>
                          Keep dancing and spreading the love! 💖
                        </p>
                      </td>
                    </tr>
                  </table>
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
      subject: `Latin Dance Events in ${city} 🎉 Curated Just for You!`,
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