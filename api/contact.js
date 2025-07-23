export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message, recaptcha } = req.body;

  // 1. Verify reCAPTCHA
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaVerify = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaSecret}&response=${recaptcha}`,
    }
  );
  const recaptchaJson = await recaptchaVerify.json();
  if (!recaptchaJson.success) {
    return res.status(400).json({ success: false, error: 'reCAPTCHA failed' });
  }

  // 2. Send email via EmailJS REST API
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

  if (emailResponse.ok) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ success: false, error: 'Email send failed' });
  }
} 