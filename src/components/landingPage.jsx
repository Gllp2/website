import React, { useState, useEffect } from 'react';
import '../styles/landingPage.css';

export default function LandingPage() {
  const fullTitle = "Full Stack Web Developer";
  const highlightLength = 10; // 'Full Stack' length
  const [typedTitle, setTypedTitle] = useState("");
  const speed = 50; // ms per character

  useEffect(() => {
    let i = 0;
    let timeoutId;

    function typeWriter() {
      if (i <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, i));
        i++;
        timeoutId = setTimeout(typeWriter, speed);
      }
    }
    typeWriter();

    return () => clearTimeout(timeoutId); // cleanup on unmount
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
            <a
              className="cta-button"
              href="https://github.com/goncalo-laureano"
              target="_blank"
              rel="noopener noreferrer"
            >
              See my work
            </a>
          </div>
          <div className="image-container">
            <img src={process.env.PUBLIC_URL + "/img/me.jpeg"} alt="Gonçalo Laureano" className="image"/>
          </div>
        </div>
      </div>
    </>
  );
}