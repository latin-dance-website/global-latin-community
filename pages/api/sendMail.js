import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_EMAIL,      // e.g., 877bb6001@smtp-brevo.com
        pass: process.env.BREVO_API_KEY,    // your Brevo SMTP key
      },
    });

    const mailOptions = {
      from: process.env.BREVO_FROM_EMAIL,  // e.g., vijay762005@gmail.com
      to,                                  // recipient email
      subject,                             // subject of the email
      text,                                // plain text version (fallback)
      html,                                // rich HTML content
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
