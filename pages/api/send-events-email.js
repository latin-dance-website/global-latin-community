import sendPersonalizedEventEmail from '../api/sendPersonalizedEventEmail'; // Adjust path as needed

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { events, city, userDetails, startDate, endDate } = req.body;

    // ✅ Basic Validation
    if (!events || !Array.isArray(events) || events.length === 0 || !city || !userDetails?.email) {
      return res.status(400).json({ 
        message: 'Missing required fields: events, city, and userDetails.email' 
      });
    }

    // ✅ Validate environment variables
    const requiredEnv = ['BREVO_EMAIL', 'BREVO_SMTP_PASSWORD', 'BREVO_FROM_EMAIL'];
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);
    if (missingEnv.length > 0) {
      console.error('❌ Missing environment variables:', missingEnv.join(', '));
      return res.status(500).json({ 
        message: 'Server configuration error: Missing environment variables' 
      });
    }

    // ✅ Send the email
    const result = await sendPersonalizedEventEmail(events, city, userDetails, startDate, endDate);

    if (result.success) {
      return res.status(200).json({ 
        message: 'Email sent successfully!',
        messageId: result.messageId || null,
        data: result.data || null
      });
    } else {
      console.error('❌ Email sending failed:', result.error);
      return res.status(500).json({ 
        message: 'Failed to send email',
        error: result.error || 'Unknown error'
      });
    }
    } catch (error) {
    console.error('❌ API Error in /api/send-events-email:', {
      message: error.message,
      stack: error.stack
    });

    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}