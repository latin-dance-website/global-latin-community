import fetch from 'node-fetch';
import nodemailer from "nodemailer";
import fs from 'fs';
import dayjs from 'dayjs';

// Modified saveEmailPreview function
function saveEmailPreview(html, filename = 'preview.html') {
  if (process.env.NODE_ENV === 'development') {
    const fs = require('fs');
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Email preview saved as ${filename}. Open it in your browser.`);
  } else {
    console.log('📧 Email preview generated (not saved in production)');
  }
}

// Function to generate event card HTML optimized for Gmail
const generateEventCardHTML = (event) => {
  const cardContent = `
    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 300px; margin: 0 auto 15px auto; background: white; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Event Image -->
      <tr>
        <td style="width: 100%; height: 180px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; text-align: center; vertical-align: middle;">
          <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
          <!-- Genre Badge -->
          <div style="position: absolute; top: 8px; right: 8px; background: #ff6b35; color: white; padding: 4px 8px; border-radius: 10px; font-size: 9px; font-weight: bold;">
            ${event.musicRatio || 'LATIN'}
          </div>
        </td>
      </tr>
      
      <!-- Event Details -->
      <tr>
        <td style="padding: 15px;">
          <!-- Title -->
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 12px;">
            <tr>
              <td style="text-align: center;">
                <h3 style="font-size: 14px; font-weight: 700; line-height: 1.3; color: #1a202c; margin: 0; font-family: Arial, sans-serif;">
                  ${event.title}
                </h3>
              </td>
            </tr>
          </table>
          
          <!-- Date & Time Row -->
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background: #667eea; border-radius: 8px; margin-bottom: 10px;">
            <tr>
              <td style="padding: 8px; width: 50%; text-align: center; color: white; font-size: 10px; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                📅 ${event.formattedDate || event.day + ', ' + event.shortDate}
              </td>
              <td style="padding: 8px; width: 50%; text-align: center; color: white; font-size: 10px; font-weight: 600;">
                ⏰ ${event.startTime}-${event.endTime}
              </td>
            </tr>
          </table>
          
          <!-- Price & Music Row -->
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 10px;">
            <tr>
              <td style="width: 48%; padding: 6px; background: #10b981; color: white; text-align: center; border-radius: 15px; font-size: 10px; font-weight: 600;">
                💰 ${event.fees || 'FREE'}
              </td>
              <td style="width: 4%;"></td>
              <td style="width: 48%; padding: 6px; background: #f59e0b; color: white; text-align: center; border-radius: 15px; font-size: 10px; font-weight: 600;">
                🎵 ${event.musicRatio || 'Mixed'}
              </td>
            </tr>
          </table>
          
          <!-- Location -->
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background: #f8fafc; border-radius: 8px; border-left: 3px solid #9c3cf6;">
            <tr>
              <td style="padding: 8px;">
                <span style="color: #9c3cf6; font-size: 12px;">📍</span>
                <span style="font-size: 11px; color: #4a5568; font-weight: 600; margin-left: 5px; font-family: Arial, sans-serif;">
                  ${event.location}
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
  
  return cardContent;
};

// Function to generate more events button
const generateMoreEventsButton = (city, userDetails) => {
  const exploreUrl = `https://www.globallatindancecommunity.com/events/display?city=${encodeURIComponent(city)}&startDate=${userDetails.startDate}&endDate=${userDetails.endDate}`;
  
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 300px; margin: 0 auto 15px auto;">
      <tr>
        <td style="text-align: center; padding: 20px 0;">
          <a href="${exploreUrl}" style="text-decoration: none;">
            <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4); display: inline-table; transition: transform 0.3s ease;">
              <tr>
                <td style="padding: 25px 30px; text-align: center;">
                  <div style="font-size: 28px; margin-bottom: 10px;">🎉</div>
                  <h3 style="color: white; font-size: 16px; font-weight: 700; margin: 0 0 8px 0; font-family: Arial, sans-serif;">
                    Discover More Events!
                  </h3>
                  <p style="color: rgba(255,255,255,0.9); font-size: 12px; margin: 0 0 15px 0; font-family: Arial, sans-serif;">
                    Join our community for exclusive access to all events
                  </p>
                  <div style="background: white; color: #667eea; padding: 10px 20px; border-radius: 25px; font-weight: 700; font-size: 13px; display: inline-block; font-family: Arial, sans-serif;">
                    🚀 Explore All Events
                  </div>
                </td>
              </tr>
            </table>
          </a>
        </td>
      </tr>
    </table>
  `;
};

// Function to generate the complete email HTML optimized for Gmail
const generateEmailHTML = (events, city, userDetails, startDate, endDate) => {
  const visibleEvents = events.slice(0, 2);
  const hasMoreEvents = events.length > 2;
  
  const visibleEventsHTML = visibleEvents.map(event => generateEventCardHTML(event)).join('');
  const moreEventsButtonHTML = hasMoreEvents ? generateMoreEventsButton(city, userDetails) : '';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Personalized Latin Dance Events</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      
      <!-- Main Container -->
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto; background: white;">
        
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; color: white;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="text-align: center;">
                  <div style="font-size: 40px; margin-bottom: 15px;">💃🕺</div>
                  <h1 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 700; line-height: 1.3; color: white; font-family: Arial, sans-serif;">
                    Welcome to the Global<br/>Latin Dance Community!
                  </h1>
                  <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, sans-serif;">
                    Your personalized dance events calendar for ${city} ✨
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Welcome Section -->
        <tr>
          <td style="padding: 20px; background: #f8fafc; text-align: center;">
            <h2 style="color: #2d3748; font-size: 16px; margin: 0 0 15px 0; font-weight: 600; font-family: Arial, sans-serif;">
              Curated Events Just for You! 🎉
            </h2>
            
            <!-- Dance Styles -->
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 15px;">
              <tr>
                <td style="text-align: center;">
                  <table cellpadding="0" cellspacing="0" border="0" style="display: inline-table;">
                    <tr>
                      <td style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; margin: 0 5px;">
                        💃 Salsa
                      </td>
                      <td style="background: #9c3cf6; color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; margin: 0 5px;">
                        🕺 Bachata
                      </td>
                    </tr>
                  </table>
                  <br/>
                  <table cellpadding="0" cellspacing="0" border="0" style="display: inline-table; margin-top: 8px;">
                    <tr>
                      <td style="background: #10b981; color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; margin: 0 5px;">
                        💫 Kizomba
                      </td>
                      <td style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; margin: 0 5px;">
                        🌟 Zouk
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <p style="color: #4a5568; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
              All events are verified and handpicked for the best dance experience
            </p>
          </td>
        </tr>
        
        <!-- Events Section -->
        <tr>
          <td style="padding: 20px 15px; background: white;">
            <!-- Events Header -->
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="text-align: center;">
                  <h3 style="color: #2d3748; margin: 0 0 8px 0; font-size: 18px; font-weight: 700; font-family: Arial, sans-serif;">
                    Your Events in ${city} 🌟
                  </h3>
                  <div style="background: #667eea; color: white; padding: 6px 15px; border-radius: 15px; display: inline-block; font-size: 12px; font-weight: 500;">
                    ${startDate} - ${endDate}
                  </div>
                </td>
              </tr>
            </table>
            
            <!-- Events Grid -->
            ${visibleEventsHTML}
            ${moreEventsButtonHTML}
            
            ${hasMoreEvents ? `
            
            ` : ''}
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding: 20px; text-align: center; background: #2d3748; color: white;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="text-align: center; margin-bottom: 15px;">
                  <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: white; font-family: Arial, sans-serif;">
                    Stay Connected with the Dance Community! 💃🕺
                  </h4>
                  <p style="margin: 0 0 15px 0; font-size: 12px; color: rgba(255,255,255,0.8); font-family: Arial, sans-serif;">
                    Follow us for daily dance tips, events, and community updates
                  </p>
                </td>
              </tr>
              
              <!-- Social Buttons -->
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
              
              <!-- Footer Text -->
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

// Main function to send email using Brevo API
export async function sendPersonalizedEventEmail(events, city, userDetails) {
  const { startDate, endDate } = userDetails;
  const start = userDetails.startDate ? dayjs(userDetails.startDate).format("DD MMMM") : '';
  const end = userDetails.endDate ? dayjs(userDetails.endDate).format("DD MMMM") : '';
  const htmlContent = generateEmailHTML(events, city, userDetails, start, end);

  saveEmailPreview(htmlContent);
  
  const textContent = `
🎉 Welcome to Global Latin Dance Community!

Thanks for registering! Here are your personalized upcoming events calendar in ${city}:

${events
  .slice(0, 2)
  .map(
    (event) => `
🎵 Event: ${event.title}
📅 Date: ${event.formattedDate || event.day + ', ' + event.shortDate}
⏰ Time: ${event.startTime}-${event.endTime}
📍 Location: ${event.location}
💰 Price: ${event.fees || 'Free'}
🎶 Music: ${event.musicRatio || 'Mixed'}
---`
  )
  .join('')}

${events.length > 2 ? '🚀 Discover more amazing events on our website!' : ''}

We've curated verified Salsa 💃, Bachata 🕺, Kizomba 💫 & Zouk 🌟 events just for you!

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
      console.error("❌ Email not sent: userDetails.email is missing or empty", userDetails);
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
      full: error
    });
    return { success: false, error: error.message };
  }
}

export default sendPersonalizedEventEmail;