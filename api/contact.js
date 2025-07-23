export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message, recaptcha } = req.body;

  console.log("Incoming request body:", req.body);

  // Validate required fields
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!message) missingFields.push("message");
  if (!recaptcha) missingFields.push("recaptcha");

  if (missingFields.length > 0) {
    console.warn("Missing fields:", missingFields);
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  try {
    // 1. Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaVerify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaSecret}&response=${recaptcha}`,
    });

    const recaptchaJson = await recaptchaVerify.json();
    console.log('reCAPTCHA verification response:', recaptchaJson);

    if (!recaptchaJson.success) {
      return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
    }

    // 2. Send email using EmailJS
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID_MAIN;
    const emailjsUserId = process.env.EMAILJS_USER_ID;

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: emailjsServiceId,
        template_id: emailjsTemplateId,
        user_id: emailjsUserId,
        template_params: { name, email, message },
      }),
    });

    console.log('EmailJS response status:', emailResponse.status);

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('EmailJS error:', errorText);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
