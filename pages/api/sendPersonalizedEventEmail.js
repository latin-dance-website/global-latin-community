import fetch from 'node-fetch'; // Make sure to install: npm install node-fetch
import nodemailer from "nodemailer";
// Function to generate event card HTML
const generateEventCardHTML = (event) => {
  return `
    <div style="
      width: 300px;
      margin: 16px;
      border-radius: 12px;
      overflow: hidden;
      background: white;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      display: inline-block;
      vertical-align: top;
    ">
      <!-- Event Image -->
      <div style="
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: #f8f9fa;
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
      <div style="padding: 12px;">
        <!-- Title -->
        <h3 style="
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
          color: #E53E3E;
          text-align: center;
          margin: 0 0 8px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          ${event.title}
        </h3>
        
        <!-- Date and Time -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 6px;
          gap: 8px;
        ">
          <span style="color: #6366f1; font-size: 12px;">📅</span>
          <span style="
            font-size: 12px;
            color: #666;
            font-weight: 600;
          ">
            ${event.formattedDate || event.day + ', ' + event.shortDate}
          </span>
          <span style="color: #6366f1; font-size: 12px;">🕒</span>
          <span style="
            font-size: 12px;
            color: #666;
            font-weight: 600;
          ">
            ${event.startTime} - ${event.endTime}
          </span>
        </div>
        
        <!-- Location -->
        <div style="
          display: flex;
          align-items: flex-start;
          gap: 8px;
        ">
          <span style="color: #6366f1; font-size: 12px; margin-top: 2px;">📍</span>
          <span style="
            font-size: 12px;
            color: #666;
            font-weight: 600;
            line-height: 1.3;
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

// Function to generate the complete email HTML
const generateEmailHTML = (events, city, userDetails) => {
  const eventsHTML = events.map(event => generateEventCardHTML(event)).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Personalized Latin Dance Events</title>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8f9fa;
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
          padding: 40px 20px;
          text-align: center;
        ">
          <h1 style="
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: bold;
          ">
            Thanks for registering for Global Latin Dance Community! 🎉
          </h1>
          <p style="
            margin: 0;
            font-size: 18px;
            opacity: 0.9;
          ">
            Here are your personalized upcoming events in ${city}
          </p>
        </div>
        
        <!-- Welcome Message -->
        <div style="
          padding: 30px 20px;
          text-align: center;
          background: #fff;
        ">
          <h2 style="
            color: #333;
            margin: 0 0 15px 0;
            font-size: 24px;
          ">
            Get ready to dance! 💃🕺
          </h2>
          <p style="
            color: #666;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px 0;
          ">
            We've curated the best <span style="color: #ff6b35; font-weight: bold;">Salsa</span>, 
            <span style="color: #9c3cf6; font-weight: bold;">Bachata</span>, 
            <span style="color: #10b981; font-weight: bold;">Kizomba</span> & 
            <span style="color: #f59e0b; font-weight: bold;">Zouk</span> events just for you!
          </p>
        </div>
        
        <!-- Events Section -->
        <div style="
          padding: 20px;
          background: #f8f9fa;
        ">
          <h3 style="
            text-align: center;
            color: #333;
            margin: 0 0 30px 0;
            font-size: 22px;
          ">
            Your Events in ${city} 🌟
          </h3>
          
          <!-- Events Container -->
          <div style="
            text-align: center;
            line-height: 0;
          ">
            ${eventsHTML}
          </div>
        </div>
        
        <!-- Footer Message -->
        <div style="
          padding: 30px 20px;
          text-align: center;
          background: white;
          border-top: 2px solid #9c3cf6;
        ">
          <h3 style="
            color: #9c3cf6;
            margin: 0 0 15px 0;
            font-size: 20px;
          ">
            Ready to Dance? 🎵
          </h3>
          <p style="
            color: #666;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px 0;
          ">
            Save this email and show up at any of these verified events. 
            No need to worry about authenticity - we've got you covered!
          </p>
          
          <!-- Contact Info Display -->
          <div style="
            background: #f8f4ff;
            border: 2px solid #9c3cf6;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            display: inline-block;
          ">
            <h4 style="
              color: #9c3cf6;
              margin: 0 0 10px 0;
              font-size: 16px;
            ">
              Your Registration Details:
            </h4>
            <p style="margin: 5px 0; color: #333; font-size: 14px;">
              📧 Email: ${userDetails.email}
            </p>
            ${userDetails.phone ? `
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                📱 Phone: ${userDetails.phone}
              </p>
            ` : ''}
            ${userDetails.instagram ? `
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                📸 Instagram: @${userDetails.instagram}
              </p>
            ` : ''}
          </div>
          
          <p style="
            color: #999;
            font-size: 14px;
            margin: 20px 0 0 0;
          ">
            Questions? Reply to this email or follow us on social media for updates!
          </p>
          
          <!-- Social Links -->
          <div style="margin-top: 20px;">
            <a href="#" style="
              display: inline-block;
              margin: 0 10px;
              padding: 8px 16px;
              background: #9c3cf6;
              color: white;
              text-decoration: none;
              border-radius: 20px;
              font-size: 14px;
            ">
              Follow Us
            </a>
            <a href="#" style="
              display: inline-block;
              margin: 0 10px;
              padding: 8px 16px;
              background: #ff6b35;
              color: white;
              text-decoration: none;
              border-radius: 20px;
              font-size: 14px;
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

  const textContent = `
Thanks for registering for Global Latin Dance Community!

Here are your personalized upcoming events in ${city}:

${events
  .map(
    (event) => `
Event: ${event.title}
Date: ${event.formattedDate || event.day + ', ' + event.shortDate}
Time: ${event.startTime} - ${event.endTime}
Location: ${event.location}
---`
  )
  .join('')}

Get ready to dance!

Your registration details:
Email: ${userDetails.email}
${userDetails.phone ? `Phone: ${userDetails.phone}` : ''}
${userDetails.instagram ? `Instagram: @${userDetails.instagram}` : ''}
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