import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/contactMe.css';


const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_MAIN;
const EMAILJS_TEMPLATE_ID_REPLY = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_REPLY;
const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

const ContactForm = () => {
  const form = useRef();
  const recaptchaRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }
    return () => titleObserver.disconnect();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!recaptchaValue) {
      alert("Please verify that you are not a robot.");
      return;
    }

    setLoading(true);

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      form.current,
      EMAILJS_USER_ID
    )
    .then(
      (result) => {
        if (EMAILJS_TEMPLATE_ID_REPLY) {
          emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_REPLY,
            { name, email, message },
            EMAILJS_USER_ID
          ).then(
            () => {},
            (error) => {
              console.error("Confirmation email error:", error);
            }
          );
        }
        alert("✅ Message sent! Thank you for contacting me.");
        e.target.reset();
        setRecaptchaValue(null);
        recaptchaRef.current.reset();
      },
      (error) => {
        alert("❌ Oops! Something went wrong. Please try again.");
      }
    )
    .finally(() => setLoading(false));
  };

  return (
    <div>
      {!RECAPTCHA_SITE_KEY ? (
        <div style={{ color: "red", padding: 20 }}>
          Error: Missing reCAPTCHA site key environment variable.
          <br />
          Please set REACT_APP_RECAPTCHA_SITE_KEY.
        </div>
      ) : (
        <form
          ref={form}
          id="contact-me"
          onSubmit={sendEmail}
          className={`contact-form fade-in-contact${visible ? " visible" : ""}`}
        >
          <div ref={titleRef} className={`contact-title-reveal${titleVisible ? ' visible' : ''}`}>
            <div className="line split"></div>
            <span className="contact-title-center">Contact Me</span>
            <div className="line split"></div>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="contact-input"
            disabled={loading}
            maxlength="50"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="contact-input"
            disabled={loading}
            maxlength="50"
          />
          <textarea
            name="message"
            rows="5"
            maxlength="50"
            placeholder="Your Message"
            required
            className="contact-input"
            disabled={loading}
          />

          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={setRecaptchaValue}
            ref={recaptchaRef}
            style={{ margin: "20px 0" }}
          />

          <button
            type="submit"
            className="contact-cta-button"
            disabled={!recaptchaValue || loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

