import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contactMe.css';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

console.log("RECAPTCHA_SITE_KEY =", RECAPTCHA_SITE_KEY);

const ContactForm = () => {
  const form = useRef();
  const recaptchaRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (form.current) {
      observer.observe(form.current);
    }
    return () => observer.disconnect();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('Please verify that you are not a robot.');
      return;
    }

    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      recaptcha: recaptchaValue,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ Message sent! Thank you for contacting me.');
        e.target.reset();
        setRecaptchaValue(null);
        recaptchaRef.current.reset();
      } else {
        alert('❌ Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('❌ Oops! Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Debug: Log the site key to ensure it's loaded
  return (
    <div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className={`contact-form fade-in-contact${visible ? ' visible' : ''}`}
      >
        <div className="contact-title-reveal">
          <div className="contact-line split"></div>
          <span className="contact-title-center">Contact Me</span>
          <div className="contact-line split"></div>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="contact-input"
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="contact-input"
          disabled={loading}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="contact-input"
          disabled={loading}
        />

        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(value) => setRecaptchaValue(value)}
          ref={recaptchaRef}
          style={{ margin: '20px 0' }}
        />

        <button
          type="submit"
          className="contact-cta-button"
          disabled={!recaptchaValue || loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
