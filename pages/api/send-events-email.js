import sendPersonalizedEventEmail from '../api/sendPersonalizedEventEmail'; // Adjust path as needed

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { events, city, userDetails } = req.body;

    // Validation
    if (!events || !city || !userDetails || !userDetails.email) {
      return res.status(400).json({ 
        message: 'Missing required fields: events, city, and userDetails.email' 
      });
    }

    // Validate environment variables
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_FROM_EMAIL) {
      console.error('Missing Brevo configuration');
      return res.status(500).json({ 
        message: 'Email service configuration error' 
      });
    }

    // Send email
    const result = await sendPersonalizedEventEmail(events, city, userDetails);

    if (result.success) {
      res.status(200).json({ 
        message: 'Email sent successfully!',
        messageId: result.messageId,
        data: result.data
      });
    } else {
      console.error('Brevo email error:', result.error);
      res.status(500).json({ 
        message: 'Failed to send email',
        error: result.error 
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}