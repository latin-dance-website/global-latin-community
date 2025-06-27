import fetch from 'node-fetch'; // Make sure to install: npm install node-fetch
import nodemailer from "nodemailer";
import fs from 'fs';
import dayjs from 'dayjs';

// Modified saveEmailPreview function
function saveEmailPreview(html, filename = 'preview.html') {
  if (process.env.NODE_ENV === 'development') {
    // Only write files in development
    const fs = require('fs');
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Email preview saved as ${filename}. Open it in your browser.`);
  } else {
    // In production, just log that we would have saved a preview
    console.log('📧 Email preview generated (not saved in production)');
  }
}


// Function to generate event card HTML with improved dance community design
const generateEventCardHTML = (event, isBlurred = false) => {
  return `
    <div class="event-card" style="
      width: 100%;
      max-width: 320px;
      margin: 16px auto;
      border-radius: 20px;
      overflow: hidden;
      background: linear-gradient(145deg, #ffffff, #f8fafc);
      border: 1px solid #e2e8f0;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
      display: inline-block;
      vertical-align: top;
      transition: all 0.3s ease;
      position: relative;
      ${isBlurred ? 'filter: blur(3px); opacity: 0.7; transform: scale(0.95);' : ''}
    ">
      ${isBlurred ? `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          background: rgba(156, 60, 246, 0.95);
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 4px 15px rgba(156, 60, 246, 0.4);
        ">
          🔐 Premium Event
        </div>
      ` : ''}
      
      <!-- Event Image with Overlay -->
      <div style="
        width: 100%;
        height: 220px;
        overflow: hidden;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        <!-- Dance Genre Badge -->
        <div style="
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          ${event.musicRatio || 'LATIN'}
        </div>
      </div>
      
      <!-- Event Details -->
      <div style="padding: 20px 18px;">
        <!-- Title -->
        <h3 style="
          font-size: 16px;
          font-weight: 700;
          line-height: 1.3;
          color: #1a202c;
          text-align: center;
          margin: 0 0 16px 0;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-overflow: ellipsis;
          overflow: hidden;
        ">
          ${event.title}
        </h3>
        
        <!-- Date & Time Row -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 10px 14px;
          border-radius: 12px;
          color: white;
        ">
          <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
            <span style="font-size: 14px;">📅</span>
            <span style="
              font-size: 11px;
              font-weight: 600;
              line-height: 1.2;
            ">
              ${event.formattedDate || event.day + ', ' + event.shortDate}
            </span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
            <span style="font-size: 14px;">⏰</span>
            <span style="
              font-size: 11px;
              font-weight: 600;
            ">
              ${event.startTime}-${event.endTime}
            </span>
          </div>
        </div>
        
        <!-- Price & Music Row -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 8px;
        ">
          <div style="
            display: flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            flex: 1;
            justify-content: center;
          ">
            <span style="font-size: 12px;">💰</span>
            <span style="
              font-size: 11px;
              font-weight: 600;
            ">
              ${event.fees || 'FREE'}
            </span>
          </div>
          
          <div style="
            display: flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            flex: 1;
            justify-content: center;
          ">
            <span style="font-size: 12px;">🎵</span>
            <span style="
              font-size: 11px;
              font-weight: 600;
            ">
              ${event.musicRatio || 'Mixed'}
            </span>
          </div>
        </div>
        
        <!-- Location -->
        <div style="
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #f8fafc;
          padding: 12px;
          border-radius: 12px;
          border-left: 4px solid #9c3cf6;
        ">
          <span style="color: #9c3cf6; font-size: 14px; margin-top: 1px;">📍</span>
          <span style="
            font-size: 12px;
            color: #4a5568;
            font-weight: 600;
            line-height: 1.4;
            flex: 1;
            word-break: break-word;
          ">
            ${event.location}
          </span>
        </div>
      </div>
    </div>
  `;
};

// Function to generate the complete email HTML with dance community theme
const generateEmailHTML = (events, city, userDetails, startDate, endDate) => {
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            margin: 0 !important;
          }
          
          .header-title {
            font-size: 20px !important;
            line-height: 1.3 !important;
          }
          
          .header-subtitle {
            font-size: 14px !important;
          }
          
          .events-container {
            padding: 10px !important;
          }
          
          .event-card {
            width: 95% !important;
            margin: 12px auto !important;
          }
          
          .cta-container {
            margin: 10px !important;
            padding: 16px !important;
          }
          
          .cta-title {
            font-size: 16px !important;
          }
          
          .cta-button {
            padding: 10px 20px !important;
            font-size: 14px !important;
          }
          
          .footer-buttons {
            flex-direction: column !important;
            gap: 10px !important;
          }
          
          .footer-button {
            width: 200px !important;
            margin: 5px auto !important;
          }
        }
      </style>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      line-height: 1.6;
      min-height: 100vh;
    ">
      <div class="email-container" style="
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 0;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      ">
        <!-- Animated Header -->
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
          color: white;
          padding: 40px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        ">
          <!-- Dancing figures background -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><text y=\"50\" font-size=\"30\">💃🕺💃🕺</text></svg>');
            background-repeat: repeat;
            background-size: 80px 80px;
          "></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="margin-bottom: 20px;">
              <span style="font-size: 48px; display: block; margin-bottom: 10px;">💃🕺</span>
            </div>
            
            <h1 class="header-title" style="
              margin: 0 0 15px 0;
              font-size: 26px;
              font-weight: 700;
              line-height: 1.4;
              text-align: center;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">
              Welcome to the Global<br/>
              <span style="
                background: linear-gradient(45deg, #ff6b35, #f7931e);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 800;
              ">
                Latin Dance Community!
              </span>
            </h1>

            <p class="header-subtitle" style="
              margin: 0;
              font-size: 16px;
              opacity: 0.95;
              font-weight: 300;
              letter-spacing: 0.5px;
            ">
              Your personalized dance events calendar for ${city} ✨
            </p>
          </div>
        </div>
        
        <!-- Welcome Message with Dance Styles -->
        <div style="
          padding: 30px 25px;
          text-align: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid #e2e8f0;
        ">
          <h2 style="
            color: #2d3748;
            font-size: 18px;
            margin: 0 0 20px 0;
            font-weight: 600;
          ">
            Curated Events Just for You! 🎉
          </h2>
          
          <div style="
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 15px;
          ">
            <span style="
              background: linear-gradient(135deg, #ef4444, #dc2626);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 5px;
            ">💃 SALSA</span>
            
            <span style="
              background: linear-gradient(135deg, #9c3cf6, #7c3aed);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 5px;
            ">🕺 BACHATA</span>
            
            <span style="
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 5px;
            ">💫 KIZOMBA</span>
            
            <span style="
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 5px;
            ">🌟 ZOUK</span>
          </div>
          
          <p style="
            color: #4a5568;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            font-weight: 400;
          ">
            All events are verified and handpicked for the best dance experience
          </p>
        </div>
        
        <!-- Events Section -->
        <div class="events-container" style="
          padding: 30px 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
        ">
          <div style="text-align: center; margin-bottom: 30px;">
            <h3 style="
              color: #2d3748;
              margin: 0 0 10px 0;
              font-size: 22px;
              font-weight: 700;
            ">
              Your Events in ${city} 🌟
            </h3>
            <p style="
              color: #666;
              font-size: 14px;
              margin: 0;
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              padding: 8px 20px;
              border-radius: 20px;
              display: inline-block;
              font-weight: 500;
            ">
              ${startDate} - ${endDate}
            </p>
          </div>
          
          <!-- Events Container -->
          <div style="
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
          ">
            ${visibleEventsHTML}
            ${blurredEventHTML}
          </div>
          
          ${blurredEvent ? `
          <!-- More Events CTA -->
          <div class="cta-container" style="
            text-align: center;
            margin: 30px 20px 0 20px;
            padding: 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: pulse 3s ease-in-out infinite;
            "></div>
            
            <div style="position: relative; z-index: 2;">
              <p class="cta-title" style="
                color: white;
                font-size: 18px;
                font-weight: 700;
                margin: 0 0 8px 0;
              ">
                🎊 Discover More Amazing Events!
              </p>
              <p style="
                color: rgba(255,255,255,0.9);
                font-size: 14px;
                margin: 0 0 20px 0;
                font-weight: 400;
              ">
                Join our premium community for exclusive access to all events
              </p>
              <a href="#" class="cta-button" style="
                display: inline-block;
                padding: 14px 28px;
                background: linear-gradient(135deg, #ffffff, #f8fafc);
                color: #667eea;
                text-decoration: none;
                border-radius: 30px;
                font-weight: 700;
                font-size: 15px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                border: 2px solid transparent;
              ">
                🚀 Explore All Events
              </a>
            </div>
          </div>
          ` : ''}
        </div>
        
        <!-- Footer -->
        <div style="
          padding: 30px 20px;
          text-align: center;
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          color: white;
        ">
          <div style="margin-bottom: 20px;">
            <h4 style="
              margin: 0 0 10px 0;
              font-size: 18px;
              font-weight: 600;
              color: white;
            ">
              Stay Connected with the Dance Community! 💃🕺
            </h4>
            <p style="
              margin: 0;
              font-size: 14px;
              opacity: 0.8;
              font-weight: 300;
            ">
              Follow us for daily dance tips, events, and community updates
            </p>
          </div>
          
          <!-- Social Links -->
          <div class="footer-buttons" style="
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
          ">
            <a href="#" class="footer-button" style="
              display: inline-block;
              padding: 12px 24px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 600;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              transition: all 0.3s ease;
            ">
              📱 Follow Us
            </a>
            <a href="#" class="footer-button" style="
              display: inline-block;
              padding: 12px 24px;
              background: linear-gradient(135deg, #ff6b35, #f7931e);
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 600;
              box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
              transition: all 0.3s ease;
            ">
              🌐 Visit Website
            </a>
          </div>
          
          <!-- Footer Text -->
          <div style="
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.2);
          ">
            <p style="
              margin: 0;
              font-size: 12px;
              opacity: 0.7;
              line-height: 1.5;
            ">
              You're receiving this because you registered for Global Latin Dance Community.<br/>
              Keep dancing and spreading the love! 💖
            </p>
          </div>
        </div>
      </div>
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
  .slice(0, 2) // Only show first 2 events in text version
  .map(
    (event) => `
🎵 Event: ${event.title}
📅 Date: ${event.formattedDate || event.day + ', ' + event.shortDate}
⏰ Time: ${event.startTime} - ${event.endTime}
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
    // Fixed: Changed createTransporter to createTransport
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

// Export for use in API routes
export default sendPersonalizedEventEmail;


// JavaScript Email Template Generator for Latin Dance Community
// Pure JS implementation without React dependencies

// Function to generate event card HTML with improved dance community design
// const generateEventCardHTML = (event, isBlurred = false) => {
//   const musicStyleColors = {
//     'SALSA': 'linear-gradient(135deg, #ef4444, #dc2626)',
//     'BACHATA': 'linear-gradient(135deg, #9c3cf6, #7c3aed)',
//     'KIZOMBA': 'linear-gradient(135deg, #10b981, #059669)',
//     'ZOUK': 'linear-gradient(135deg, #f59e0b, #d97706)',
//     'default': 'linear-gradient(135deg, #ff6b35, #f7931e)'
//   };

//   const musicStyle = event.musicStyle || event.musicRatio || 'LATIN';
//   const styleColor = musicStyleColors[musicStyle] || musicStyleColors.default;

//   return `
//     <div class="event-card" style="
//       width: 100%;
//       max-width: 340px;
//       margin: 16px auto;
//       border-radius: 24px;
//       overflow: hidden;
//       background: linear-gradient(145deg, #ffffff, #f8fafc);
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
//       display: inline-block;
//       vertical-align: top;
//       transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//       position: relative;
//       transform: translateY(0);
//       ${isBlurred ? 'filter: blur(4px); opacity: 0.6; transform: scale(0.92);' : ''}
//     ">
//       ${isBlurred ? `
//         <div style="
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           z-index: 20;
//           background: linear-gradient(135deg, rgba(156, 60, 246, 0.95), rgba(124, 58, 237, 0.95));
//           color: white;
//           padding: 14px 24px;
//           border-radius: 30px;
//           font-weight: 700;
//           font-size: 14px;
//           box-shadow: 0 8px 25px rgba(156, 60, 246, 0.5);
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(255, 255, 255, 0.2);
//         ">
//           🔐 Premium Event
//         </div>
//       ` : ''}
      
//       <!-- Event Image with Overlay -->
//       <div style="
//         width: 100%;
//         height: 240px;
//         overflow: hidden;
//         background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         position: relative;
//       ">
//         <img 
//           src="${event.image || 'https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?auto=compress&cs=tinysrgb&w=400'}" 
//           alt="${event.title || 'Dance Event'}"
//           style="
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//             transition: transform 0.4s ease;
//           "
//         />
//         <div style="
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
//         "></div>
        
//         <!-- Music Style Badge -->
//         <div style="
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           background: ${styleColor};
//           color: white;
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 11px;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//           backdrop-filter: blur(10px);
//         ">
//           ${musicStyle}
//         </div>
//       </div>
      
//       <!-- Event Details -->
//       <div style="padding: 24px 20px;">
//         <!-- Title -->
//         <h3 style="
//           font-size: 18px;
//           font-weight: 700;
//           line-height: 1.3;
//           color: #1a202c;
//           text-align: center;
//           margin: 0 0 20px 0;
//           min-height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-overflow: ellipsis;
//           overflow: hidden;
//         ">
//           ${event.title || 'Dance Event'}
//         </h3>
        
//         <!-- Date & Time Row -->
//         <div style="
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 16px;
//           gap: 10px;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           padding: 14px 16px;
//           border-radius: 16px;
//           color: white;
//           box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
//         ">
//           <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
//             <span style="font-size: 16px;">📅</span>
//             <span style="
//               font-size: 12px;
//               font-weight: 600;
//               line-height: 1.2;
//             ">
//               ${event.formattedDate || (event.day + ', ' + (event.shortDate || event.date))}
//             </span>
//           </div>
          
//           <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
//             <span style="font-size: 16px;">⏰</span>
//             <span style="
//               font-size: 12px;
//               font-weight: 600;
//             ">
//               ${event.startTime || '8:00 PM'}-${event.endTime || '11:00 PM'}
//             </span>
//           </div>
//         </div>
        
//         <!-- Price & Level Row -->
//         <div style="
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 16px;
//           gap: 10px;
//         ">
//           <div style="
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             background: linear-gradient(135deg, #10b981, #059669);
//             color: white;
//             padding: 10px 14px;
//             border-radius: 25px;
//             flex: 1;
//             justify-content: center;
//             box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
//           ">
//             <span style="font-size: 14px;">💰</span>
//             <span style="
//               font-size: 12px;
//               font-weight: 600;
//             ">
//               ${event.fees || event.price || 'FREE'}
//             </span>
//           </div>
          
//           <div style="
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             background: linear-gradient(135deg, #f59e0b, #d97706);
//             color: white;
//             padding: 10px 14px;
//             border-radius: 25px;
//             flex: 1;
//             justify-content: center;
//             box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
//           ">
//             <span style="font-size: 14px;">⭐</span>
//             <span style="
//               font-size: 12px;
//               font-weight: 600;
//             ">
//               ${event.level || 'All Levels'}
//             </span>
//           </div>
//         </div>
        
//         <!-- Location -->
//         <div style="
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           background: linear-gradient(135deg, #f8fafc, #e2e8f0);
//           padding: 16px;
//           border-radius: 16px;
//           border-left: 4px solid #9c3cf6;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//         ">
//           <span style="color: #9c3cf6; font-size: 16px; margin-top: 2px;">📍</span>
//           <span style="
//             font-size: 13px;
//             color: #4a5568;
//             font-weight: 600;
//             line-height: 1.5;
//             flex: 1;
//             word-break: break-word;
//           ">
//             ${event.location || 'Dance Studio'}
//           </span>
//         </div>
//       </div>
//     </div>
//   `;
// };

// // Function to generate the complete email HTML with dance community theme
// const generateEmailHTML = (events, city, userDetails, startDate, endDate) => {
//   // Show only first 2 events normally, blur the 3rd if it exists
//   const visibleEvents = events.slice(0, 2);
//   const blurredEvent = events.length > 2 ? events[2] : null;
  
//   const visibleEventsHTML = visibleEvents.map(event => generateEventCardHTML(event)).join('');
//   const blurredEventHTML = blurredEvent ? generateEventCardHTML(blurredEvent, true) : '';
  
//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Your Personalized Latin Dance Events</title>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
//         * {
//           box-sizing: border-box;
//         }
        
//         body {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
//           margin: 0;
//           padding: 0;
//           line-height: 1.6;
//         }
        
//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
        
//         @keyframes pulse {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.7; }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
        
//         .event-card:hover {
//           transform: translateY(-8px) !important;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
//         }
        
//         @media only screen and (max-width: 600px) {
//           .email-container {
//             width: 100% !important;
//             margin: 0 !important;
//             border-radius: 0 !important;
//           }
          
//           .header-title {
//             font-size: 24px !important;
//             line-height: 1.2 !important;
//           }
          
//           .header-subtitle {
//             font-size: 16px !important;
//           }
          
//           .events-container {
//             padding: 20px 15px !important;
//           }
          
//           .event-card {
//             width: 95% !important;
//             margin: 15px auto !important;
//             max-width: none !important;
//           }
          
//           .cta-container {
//             margin: 15px 10px !important;
//             padding: 20px !important;
//           }
          
//           .cta-title {
//             font-size: 18px !important;
//           }
          
//           .cta-button {
//             padding: 12px 24px !important;
//             font-size: 15px !important;
//           }
          
//           .footer-buttons {
//             flex-direction: column !important;
//             gap: 12px !important;
//           }
          
//           .footer-button {
//             width: 220px !important;
//             margin: 0 auto !important;
//           }
          
//           .dance-styles {
//             gap: 8px !important;
//           }
          
//           .dance-style-badge {
//             padding: 6px 12px !important;
//             font-size: 11px !important;
//           }
//         }
        
//         @media only screen and (max-width: 480px) {
//           .header-emojis {
//             font-size: 40px !important;
//           }
          
//           .section-title {
//             font-size: 20px !important;
//           }
          
//           .event-card {
//             border-radius: 16px !important;
//           }
//         }
//       </style>
//     </head>
//     <body style="
//       margin: 0;
//       padding: 0;
//       font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       min-height: 100vh;
//     ">
//       <div class="email-container" style="
//         max-width: 800px;
//         margin: 0 auto;
//         background: white;
//         border-radius: 0;
//         overflow: hidden;
//         box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
//       ">
//         <!-- Animated Header -->
//         <div style="
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 100%);
//           background-size: 300% 300%;
//           animation: gradientShift 8s ease infinite;
//           color: white;
//           padding: 50px 25px;
//           text-align: center;
//           position: relative;
//           overflow: hidden;
//         ">
//           <!-- Floating background elements -->
//           <div style="
//             position: absolute;
//             top: -20px;
//             left: -20px;
//             right: -20px;
//             bottom: -20px;
//             opacity: 0.1;
//             background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><text y=\"50\" font-size=\"25\" fill=\"white\">💃🕺💃🕺</text></svg>');
//             background-repeat: repeat;
//             background-size: 100px 100px;
//             animation: float 6s ease-in-out infinite;
//           "></div>
          
//           <div style="position: relative; z-index: 2;">
//             <div class="header-emojis" style="
//               margin-bottom: 25px;
//               animation: float 3s ease-in-out infinite;
//             ">
//               <span style="font-size: 56px; display: block; margin-bottom: 10px;">💃🕺</span>
//             </div>
            
//             <h1 class="header-title" style="
//               margin: 0 0 20px 0;
//               font-size: 32px;
//               font-weight: 800;
//               line-height: 1.3;
//               text-align: center;
//               text-shadow: 0 4px 8px rgba(0,0,0,0.3);
//             ">
//               Welcome to the Global<br/>
//               <span style="
//                 background: linear-gradient(45deg, #ff6b35, #f7931e, #ffeb3b);
//                 -webkit-background-clip: text;
//                 -webkit-text-fill-color: transparent;
//                 background-clip: text;
//                 font-weight: 900;
//                 text-shadow: none;
//               ">
//                 Latin Dance Community!
//               </span>
//             </h1>

//             <p class="header-subtitle" style="
//               margin: 0;
//               font-size: 18px;
//               opacity: 0.95;
//               font-weight: 400;
//               letter-spacing: 0.5px;
//             ">
//               Your personalized dance events calendar for ${city || 'your city'} ✨
//             </p>
//           </div>
//         </div>
        
//         <!-- Welcome Message with Dance Styles -->
//         <div style="
//           padding: 40px 30px;
//           text-align: center;
//           background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//           border-bottom: 1px solid #e2e8f0;
//         ">
//           <h2 class="section-title" style="
//             color: #2d3748;
//             font-size: 24px;
//             margin: 0 0 25px 0;
//             font-weight: 700;
//           ">
//             Curated Events Just for You! 🎉
//           </h2>
          
//           <div class="dance-styles" style="
//             display: flex;
//             justify-content: center;
//             gap: 15px;
//             flex-wrap: wrap;
//             margin-bottom: 20px;
//           ">
//             <span class="dance-style-badge" style="
//               background: linear-gradient(135deg, #ef4444, #dc2626);
//               color: white;
//               padding: 10px 18px;
//               border-radius: 25px;
//               font-size: 13px;
//               font-weight: 700;
//               display: inline-flex;
//               align-items: center;
//               gap: 6px;
//               box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
//             ">💃 SALSA</span>
            
//             <span class="dance-style-badge" style="
//               background: linear-gradient(135deg, #9c3cf6, #7c3aed);
//               color: white;
//               padding: 10px 18px;
//               border-radius: 25px;
//               font-size: 13px;
//               font-weight: 700;
//               display: inline-flex;
//               align-items: center;
//               gap: 6px;
//               box-shadow: 0 4px 15px rgba(156, 60, 246, 0.3);
//             ">🕺 BACHATA</span>
            
//             <span class="dance-style-badge" style="
//               background: linear-gradient(135deg, #10b981, #059669);
//               color: white;
//               padding: 10px 18px;
//               border-radius: 25px;
//               font-size: 13px;
//               font-weight: 700;
//               display: inline-flex;
//               align-items: center;
//               gap: 6px;
//               box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
//             ">💫 KIZOMBA</span>
            
//             <span class="dance-style-badge" style="
//               background: linear-gradient(135deg, #f59e0b, #d97706);
//               color: white;
//               padding: 10px 18px;
//               border-radius: 25px;
//               font-size: 13px;
//               font-weight: 700;
//               display: inline-flex;
//               align-items: center;
//               gap: 6px;
//               box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
//             ">🌟 ZOUK</span>
//           </div>
          
//           <p style="
//             color: #4a5568;
//             font-size: 15px;
//             line-height: 1.6;
//             margin: 0;
//             font-weight: 500;
//             max-width: 500px;
//             margin: 0 auto;
//           ">
//             All events are verified and handpicked for the best dance experience
//           </p>
//         </div>
        
//         <!-- Events Section -->
//         <div class="events-container" style="
//           padding: 40px 25px;
//           background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
//         ">
//           <div style="text-align: center; margin-bottom: 35px;">
//             <h3 class="section-title" style="
//               color: #2d3748;
//               margin: 0 0 15px 0;
//               font-size: 26px;
//               font-weight: 700;
//             ">
//               Your Events in ${city || 'Your City'} 🌟
//             </h3>
//             <div style="
//               color: white;
//               font-size: 15px;
//               margin: 0;
//               background: linear-gradient(135deg, #667eea, #764ba2);
//               padding: 10px 25px;
//               border-radius: 25px;
//               display: inline-block;
//               font-weight: 600;
//               box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
//             ">
//               ${startDate || '27 June'} - ${endDate || '28 June'}
//             </div>
//           </div>
          
//           <!-- Events Container -->
//           <div style="
//             display: flex;
//             flex-wrap: wrap;
//             justify-content: center;
//             gap: 25px;
//             margin-bottom: 25px;
//           ">
//             ${visibleEventsHTML}
//             ${blurredEventHTML}
//           </div>
          
//           ${blurredEvent ? `
//           <!-- More Events CTA -->
//           <div class="cta-container" style="
//             text-align: center;
//             margin: 35px 20px 0 20px;
//             padding: 30px;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//             background-size: 200% 200%;
//             animation: gradientShift 8s ease infinite;
//             border-radius: 24px;
//             position: relative;
//             overflow: hidden;
//             box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
//           ">
//             <div style="
//               position: absolute;
//               top: -50%;
//               left: -50%;
//               width: 200%;
//               height: 200%;
//               background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
//               animation: pulse 4s ease-in-out infinite;
//             "></div>
            
//             <div style="position: relative; z-index: 2;">
//               <h4 class="cta-title" style="
//                 color: white;
//                 font-size: 22px;
//                 font-weight: 700;
//                 margin: 0 0 10px 0;
//                 text-shadow: 0 2px 4px rgba(0,0,0,0.2);
//               ">
//                 🎊 Discover More Amazing Events!
//               </h4>
//               <p style="
//                 color: rgba(255,255,255,0.9);
//                 font-size: 16px;
//                 margin: 0 0 25px 0;
//                 font-weight: 400;
//                 line-height: 1.5;
//               ">
//                 Join our premium community for exclusive access to all events
//               </p>
//               <a href="#" class="cta-button" style="
//                 display: inline-block;
//                 padding: 16px 32px;
//                 background: linear-gradient(135deg, #ffffff, #f8fafc);
//                 color: #667eea;
//                 text-decoration: none;
//                 border-radius: 35px;
//                 font-weight: 700;
//                 font-size: 16px;
//                 box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//                 transition: all 0.3s ease;
//                 border: 2px solid transparent;
//               ">
//                 🚀 Explore All Events
//               </a>
//             </div>
//           </div>
//           ` : ''}
//         </div>
        
//         <!-- Footer -->
//         <div style="
//           padding: 40px 25px;
//           text-align: center;
//           background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
//           color: white;
//         ">
//           <div style="margin-bottom: 25px;">
//             <h4 style="
//               margin: 0 0 12px 0;
//               font-size: 20px;
//               font-weight: 600;
//               color: white;
//             ">
//               Stay Connected with the Dance Community! 💃🕺
//             </h4>
//             <p style="
//               margin: 0;
//               font-size: 15px;
//               opacity: 0.8;
//               font-weight: 400;
//               line-height: 1.5;
//               max-width: 400px;
//               margin: 0 auto;
//             ">
//               Follow us for daily dance tips, events, and community updates
//             </p>
//           </div>
          
//           <!-- Social Links -->
//           <div class="footer-buttons" style="
//             display: flex;
//             justify-content: center;
//             gap: 18px;
//             flex-wrap: wrap;
//             margin-bottom: 30px;
//           ">
//             <a href="#" class="footer-button" style="
//               display: inline-block;
//               padding: 14px 28px;
//               background: linear-gradient(135deg, #667eea, #764ba2);
//               color: white;
//               text-decoration: none;
//               border-radius: 30px;
//               font-size: 15px;
//               font-weight: 600;
//               box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
//               transition: all 0.3s ease;
//             ">
//               📱 Follow Us
//             </a>
//             <a href="#" class="footer-button" style="
//               display: inline-block;
//               padding: 14px 28px;
//               background: linear-gradient(135deg, #ff6b35, #f7931e);
//               color: white;
//               text-decoration: none;
//               border-radius: 30px;
//               font-size: 15px;
//               font-weight: 600;
//               box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
//               transition: all 0.3s ease;
//             ">
//               🌐 Visit Website
//             </a>
//           </div>
          
//           <!-- Footer Text -->
//           <div style="
//             padding-top: 25px;
//             border-top: 1px solid rgba(255,255,255,0.2);
//           ">
//             <p style="
//               margin: 0;
//               font-size: 13px;
//               opacity: 0.7;
//               line-height: 1.6;
//             ">
//               You're receiving this because you registered for Global Latin Dance Community.<br/>
//               Keep dancing and spreading the love! 💖
//             </p>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // Function to save email preview (keeping your existing functionality)
// function saveEmailPreview(html, filename = 'preview.html') {
//   const fs = require('fs');
//   fs.writeFileSync(filename, html, 'utf8');
//   console.log(`✅ Email preview saved as ${filename}. Open it in your browser.`);
// }

// // Main function to send email using your existing setup
// export async function sendPersonalizedEventEmail(events, city, userDetails) {
//   const dayjs = require('dayjs');
//   const { startDate, endDate } = userDetails;
//   const start = userDetails.startDate ? dayjs(userDetails.startDate).format("DD MMMM") : '';
//   const end = userDetails.endDate ? dayjs(userDetails.endDate).format("DD MMMM") : '';
//   const htmlContent = generateEmailHTML(events, city, userDetails, start, end);

//   // Save preview using your existing function
//   saveEmailPreview(htmlContent);
  
//   // Generate text content for email
//   const textContent = `
// 🎉 Welcome to Global Latin Dance Community!

// Thanks for registering! Here are your personalized upcoming events calendar in ${city}:

// ${events
//   .slice(0, 2) // Only show first 2 events in text version
//   .map(
//     (event) => `
// 🎵 Event: ${event.title}
// 📅 Date: ${event.formattedDate || event.day + ', ' + event.shortDate}
// ⏰ Time: ${event.startTime} - ${event.endTime}
// 📍 Location: ${event.location}
// 💰 Price: ${event.fees || event.price || 'Free'}
// 🎶 Music: ${event.musicRatio || event.musicStyle || 'Mixed'}
// ---`
//   )
//   .join('')}

// ${events.length > 2 ? '🚀 Discover more amazing events on our website!' : ''}

// We've curated verified Salsa 💃, Bachata 🕺, Kizomba 💫 & Zouk 🌟 events just for you!

// Stay connected with the dance community!
// `;

//   try {
//     // Use your existing nodemailer setup
//     const nodemailer = require("nodemailer");
    
//     const transporter = nodemailer.createTransport({
//       host: "smtp-relay.brevo.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.BREVO_EMAIL,
//         pass: process.env.BREVO_SMTP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.BREVO_FROM_EMAIL,
//       to: userDetails.email,
//       subject: `💃🕺 Your Personalized Latin Dance Events in ${city} - Let's Dance!`,
//       text: textContent,
//       html: htmlContent,
//     };

//     console.log("Sending email with options:", mailOptions);
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully via SMTP");

//     return { success: true };
//    } catch (error) {
//     console.error("❌ Error sending email via Nodemailer:", {
//       message: error.message,
//       stack: error.stack,
//       full: error
//     });
//     return { success: false, error: error.message };
//   }
// }

// // Export the functions for use in your existing codebase
// export { generateEventCardHTML, generateEmailHTML, saveEmailPreview };
// export default sendPersonalizedEventEmail;