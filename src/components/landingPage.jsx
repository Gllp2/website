import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/landingPage.css';

export default function LandingPage() {
  const fullTitle = "Full Stack Web Developer";
  const highlightLength = 10;
  const [typedTitle, setTypedTitle] = useState("");
  const [showButton, setShowButton] = useState(false);
  const speed = 50;

  useEffect(() => {
    let i = 0;
    let timeoutId;

    function typeWriter() {
      if (i <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, i));
        i++;
        timeoutId = setTimeout(typeWriter, speed);
      } else {
        setShowButton(true);
      }
    }
    typeWriter();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="container">
        <div className="main-content">
          <div className="content">
            <div className="subhead-upper-title">
              I'm Gonçalo Laureano, a
            </div>
            <div className="title">
              <span className="highlight">{typedTitle.slice(0, highlightLength)}</span>{typedTitle.slice(highlightLength)}
              <span className="caret"></span>
            </div>
            {showButton && (
              <>
                {/* Desktop: all in one row */}
                <div className="cta-row desktop-socials">
                  <a
                    className="cta-button fade-in"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More About Me
                  </a>
                  <a
                    className="social-btn pop-in"
                    href="https://github.com/gllp2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{ animationDelay: '0.3s' }}
                  >
                    <FaGithub size={28} />
                  </a>
                  <a
                    className="social-btn pop-in"
                    href="https://www.linkedin.com/in/gon%C3%A7alo-laureano-a8b747340/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ animationDelay: '0.45s' }}
                  >
                    <FaLinkedin size={28} />
                  </a>
                </div>
                {/* Mobile: button, then socials below */}
                <div className="mobile-socials">
                  <div className="cta-row">
                    <a
                      className="cta-button fade-in"
                      href="https://github.com/gllp2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More About Me
                    </a>
                  </div>
                  <div className="socials-row">
                    <a
                      className="social-btn pop-in"
                      href="https://github.com/gllp2"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      style={{ animationDelay: '0.3s' }}
                    >
                      <FaGithub size={28} />
                    </a>
                    <a
                      className="social-btn pop-in"
                      href="https://www.linkedin.com/in/goncalo-laureano/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      style={{ animationDelay: '0.45s' }}
                    >
                      <FaLinkedin size={28} />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="image-container">
            <img src={process.env.PUBLIC_URL + "/img/me.jpeg"} alt="Gonçalo Laureano" className="image"/>
          </div>
        </div>
      </div>
    </>
  );
}