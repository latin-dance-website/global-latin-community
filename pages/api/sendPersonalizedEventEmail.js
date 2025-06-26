import fetch from 'node-fetch'; // Make sure to install: npm install node-fetch
import nodemailer from "nodemailer";
import fs from 'fs';

function saveEmailPreview(html, filename = 'preview.html') {
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✅ Email preview saved as ${filename}. Open it in your browser.`);
}

// Function to generate event card HTML (matches your display page design)
const generateEventCardHTML = (event, isBlurred = false) => {
  return `
    <div style="
      width: 280px;
      margin: 12px;
      border-radius: 16px;
      overflow: hidden;
      background: white;
      border: 2px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      display: inline-block;
      vertical-align: top;
      transition: all 0.3s ease;
      ${isBlurred ? 'filter: blur(4px); opacity: 0.6;' : ''}
    ">
      <!-- Event Image -->
      <div style="
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: #f8f9fa;
        position: relative;
      ">
        <img 
          src="${event.image}" 
          alt="${event.title}"
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
          "
        />
      </div>
      
      <!-- Event Details -->
      <div style="padding: 16px;">
        <!-- Title -->
        <h3 style="
          font-size: 15px;
          font-weight: 700;
          line-height: 1.2;
          color: #2d3748;
          text-align: center;
          margin: 0 0 12px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          ${event.title}
        </h3>
        
        <!-- Date, Time, and Price - First Line -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 8px;
          flex-wrap: wrap;
        ">
          <div style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto;">
            <span style="color: #6366f1; font-size: 12px;">📅</span>
            <span style="
              font-size: 11px;
              color: #666;
              font-weight: 700;
            ">
              ${event.formattedDate || event.day + ', ' + event.shortDate}
            </span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto;">
            <span style="color: #6366f1; font-size: 12px;">🕒</span>
            <span style="
              font-size: 11px;
              color: #666;
              font-weight: 600;
            ">
              ${event.startTime}-${event.endTime}hrs
            </span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto;">
            <span style="color: #6366f1; font-size: 12px;">💰</span>
            <span style="
              font-size: 11px;
              color: #666;
              font-weight: 600;
            ">
              ${event.fees || 'Free'}
            </span>
          </div>
        </div>
        
        <!-- Music Ratio - Second Line -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 8px;
          gap: 4px;
        ">
          <span style="color: #6366f1; font-size: 12px;">🎵</span>
          <span style="
            font-size: 11px;
            color: #666;
            font-weight: 600;
          ">
            ${event.musicRatio || 'Mixed'}
          </span>
        </div>
        
        <!-- Location - Third Line -->
        <div style="
          display: flex;
          align-items: flex-start;
          gap: 4px;
        ">
          <span style="color: #6366f1; font-size: 12px; margin-top: 1px;">📍</span>
          <span style="
            font-size: 11px;
            color: #666;
            font-weight: 600;
            line-height: 1.3;
            flex: 1;
            word-break: break-word;
            text-align: left;
          ">
            ${event.location}
          </span>
        </div>
      </div>
    </div>
  `;
};

// Function to generate the complete email HTML
const generateEmailHTML = (events, city, userDetails) => {
  // Show only first 2 events normally, blur the 3rd if it exists
  const visibleEvents = events.slice(0, 2);
  const blurredEvent = events.length > 2 ? events[2] : null;
  
  const visibleEventsHTML = visibleEvents.map(event => generateEventCardHTML(event)).join('');
  const blurredEventHTML = blurredEvent ? generateEventCardHTML(blurredEvent, true) : '';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Personalized Latin Dance Events</title>
      <style>
        @media only screen and (max-width: 600px) {
          .events-container {
            text-align: center !important;
          }
          .event-card {
            width: 260px !important;
            margin: 8px auto !important;
            display: block !important;
          }
        }
      </style>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8f9fa;
      line-height: 1.6;
    ">
      <div style="
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 0;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #9c3cf6, #ff6b35);
          color: white;
          padding: 30px 20px;
          text-align: center;
        ">
          <h1 style="
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
">
  Thanks for registering for<br/>
  <span style="display: inline-block; margin-top: 4px;">
    Global Latin Dance Community!
  </span>
</h1>


          <p style="
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
            font-style: italic;
          ">
            Here are your personalized upcoming events calendar in ${city}
          </p>
        </div>
        
        <!-- Welcome Message -->
        <div style="
          padding: 25px 20px;
          text-align: center;
          background: #fff;
        ">
          <p style="
            color: #666;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
          ">
            We've curated <span style="color: #ff6b35; font-weight: bold;">verified Salsa</span>, 
            <span style="color: #9c3cf6; font-weight: bold;">Bachata</span>, 
            <span style="color: #10b981; font-weight: bold;">Kizomba</span> & 
            <span style="color: #f59e0b; font-weight: bold;">Zouk</span> events just for you!
          </p>
        </div>
        
        <!-- Events Section -->
        <div style="
          padding: 20px 15px;
          background: #f8f9fa;
        ">
          <h3 style="
            text-align: center;
            color: #333;
            margin: 0 0 25px 0;
            font-size: 20px;
          ">
            Your Events in ${city} 🌟
          </h3>
          
          <!-- Events Container -->
          <div class="events-container" style="
            text-align: center;
            line-height: 0;
            margin-bottom: 20px;
          ">
            ${visibleEventsHTML}
            ${blurredEventHTML}
          </div>
          
          ${blurredEvent ? `
          <!-- More Events CTA -->
          <div style="
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #9c3cf6, #ff6b35);
            border-radius: 12px;
            margin: 0 20px;
          ">
            <p style="
              color: white;
              font-size: 18px;
              font-weight: bold;
              margin: 0 0 15px 0;
            ">
              Checkout more events on Our website
            </p>
            <a href="#" style="
              display: inline-block;
              padding: 12px 24px;
              background: white;
              color: #9c3cf6;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              font-size: 16px;
            ">
              Visit Website
            </a>
          </div>
          ` : ''}
        </div>
        
        <!-- Footer -->
        <div style="
          padding: 25px 20px;
          text-align: center;
          background: white;
          border-top: 2px solid #9c3cf6;
        ">
          <!-- Social Links -->
          <div style="margin-top: 15px;">
            <a href="#" style="
              display: inline-block;
              margin: 0 10px;
              padding: 10px 20px;
              background: #9c3cf6;
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 600;
            ">
              Follow Us
            </a>
            <a href="#" style="
              display: inline-block;
              margin: 0 10px;
              padding: 10px 20px;
              background: #ff6b35;
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 600;
            ">
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Main function to send email using Brevo API
export async function sendPersonalizedEventEmail(events, city, userDetails) {
  const htmlContent = generateEmailHTML(events, city, userDetails);
  saveEmailPreview(htmlContent);
  
  const textContent = `
Thanks for registering for Global Latin Dance Community!

Here are your personalized upcoming events calendar in ${city}:

${events
  .slice(0, 2) // Only show first 2 events in text version
  .map(
    (event) => `
Event: ${event.title}
Date: ${event.formattedDate || event.day + ', ' + event.shortDate}
Time: ${event.startTime} - ${event.endTime}
Location: ${event.location}
Price: ${event.fees || 'Free'}
Music: ${event.musicRatio || 'Mixed'}
---`
  )
  .join('')}

${events.length > 2 ? 'Checkout more events on our website!' : ''}

We've curated verified Salsa, Bachata, Kizomba & Zouk events just for you!
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

    const mailOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: userDetails.email,
      subject: `🎉 Your Personalized Latin Dance Events in ${city} - Global Latin Dance Community`,
      text: textContent,
      html: htmlContent,
    };

    console.log("Sending email with options:", mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully via SMTP");

    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email via Nodemailer:", error);
    return { success: false, error: error.message };
  }
}

// Export for use in API routes
export default sendPersonalizedEventEmail;