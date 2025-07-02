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

  // Gradient colors - using solid fallbacks for email clients
  const gradients = [
    { background: '#667eea', fallback: '#667eea', text: '#764ba2' },
    { background: '#f093fb', fallback: '#f093fb', text: '#f5576c' },
    { background: '#4facfe', fallback: '#4facfe', text: '#00f2fe' },
    { background: '#43e97b', fallback: '#43e97b', text: '#38f9d7' }
  ];
  
  const cardColor = gradients[index % gradients.length];

  return `
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="260">
    <tr>
    <td width="260" valign="top" style="padding:0 6px 16px 6px;">
    <![endif]-->
    <div class="event-card" style="
      width: 100%;
      max-width: 260px;
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
      ">
        <!-- Event Image with Overlay -->
        <tr>
          <td style="position: relative;">
            <!--[if (gte mso 9)|(IE)]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:260px;height:160px;">
            <v:fill type="tile" src="${event.image}" color="${cardColor.fallback}" />
            <v:textbox inset="0,0,0,0">
            <![endif]-->
            <div>
              <img src="${event.image}" width="260" style="
                width: 100%; 
                max-width: 260px; 
                height: 160px; 
                object-fit: cover; 
                border: 0; 
                outline: none; 
                display: block;
                border-radius: 12px 12px 0 0;
              " alt="${event.title}" />
              <div style="
                position: absolute; 
                top: 0; 
                left: 0; 
                right: 0; 
                bottom: 0; 
                background: ${cardColor.background}; 
                opacity: 0.15;
                border-radius: 12px 12px 0 0;
              "></div>
            </div>
            <!--[if (gte mso 9)|(IE)]>
            </v:textbox>
            </v:rect>
            <![endif]-->
          </td>
        </tr>
        
        <!-- Event Content -->
        <tr>
          <td style="padding: 16px 14px;">
            <!-- Event Title -->
            <h3 style="
              margin: 0 0 12px 0; 
              font-size: 15px; 
              font-weight: 700; 
              color: ${cardColor.text}; 
              text-align: center; 
              line-height: 1.3;
            ">
              ${event.title || "Event Title"}
            </h3>
            
            <!-- Date, Time & Fees Row -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
              border-collapse: collapse; 
              mso-table-lspace: 0pt; 
              mso-table-rspace: 0pt; 
              margin-bottom: 10px;
            ">
              <tr>
                <td width="33.33%" style="padding-right: 2px; text-align: center;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="text-align: center; vertical-align: middle; white-space: nowrap;">
                        <span style="font-size: 12px; margin-right: 2px;">📅</span>
                        <span style="font-weight: 600; font-size: 9px; white-space: nowrap;">${formattedDate}</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="33.33%" style="padding: 0 1px; text-align: center;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="text-align: center; vertical-align: middle; white-space: nowrap;">
                        <span style="font-size: 12px; margin-right: 2px;">⏰</span>
                        <span style="font-weight: 600; font-size: 9px; white-space: nowrap;">${formattedTime}</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="33.33%" style="padding-left: 2px; text-align: center;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="text-align: center; vertical-align: middle; white-space: nowrap;">
                        <span style="font-size: 12px; margin-right: 2px;">💰</span>
                        <span style="font-weight: 600; font-size: 9px; color: ${event.fees ? '#ff6b6b' : '#00b894'}; white-space: nowrap;">${formattedPrice}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Music Ratio -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
              border-collapse: collapse; 
              mso-table-lspace: 0pt; 
              mso-table-rspace: 0pt; 
              margin-bottom: 10px;
            ">
              <tr>
                <td style="background: #fff5f5; padding: 8px 10px; border-radius: 6px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="20" style="vertical-align: middle; padding-right: 6px;">
                        <span style="font-size: 12px;">🎵</span>
                      </td>
                      <td style="vertical-align: middle;">
                        <span style="font-weight: 600; font-size: 11px;">Music Ratio: ${event.musicRatio || "1:1"}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Location -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
              border-collapse: collapse; 
              mso-table-lspace: 0pt; 
              mso-table-rspace: 0pt;
            ">
              <tr>
                <td style="background: #f0fff4; padding: 8px 10px; border-radius: 6px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="20" style="vertical-align: top; padding-right: 6px;">
                        <span style="font-size: 12px;">📍</span>
                      </td>
                      <td style="vertical-align: middle;">
                        <span style="
                          font-weight: 600; 
                          line-height: 1.3; 
                          word-break: break-word; 
                          font-size: 10px; 
                          display: inline-block;
                        ">${event.location.replace(/,/g, ", ")}</span>
                      </td>
                    </tr>
                  </table>
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
                  padding: 0px 30px 20px 30px;
                  text-align: center;
                " class="mobile-padding">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: center;">
                        <h1 style="
                          margin: 0 0 8px 0;
                          font-size: 24px;
                          font-weight: 800;
                          line-height: 1.2;
                          color: #2d3748;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                        " class="header-title">
                          Thanks for registering to
                        </h1>
                        <h1 style="
                          margin: 0 0 12px 0;
                          font-size: 24px;
                          font-weight: 800;
                          line-height: 1.2;
                          color: #2d3748;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                        " class="header-title">
                          Global Latin Dance Community!
                        </h1>
                        <p style="
                          margin: 0 0 16px 0;
                          font-size: 16px;
                          color: #4a5568;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                          font-weight: 500;
                        " class="header-subtitle">
                          Your personalised latin dance events for ${city} ✨
                        </p>
                        <div style="
                          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                          padding: 12px 20px;
                          border-radius: 30px;
                          display: inline-block;
                          max-width: 90%;
                        ">
                          <p style="
                            margin: 0;
                            font-size: 15px;
                            font-weight: 700;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                            color: #ffffff;
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