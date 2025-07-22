import React, { useRef, useEffect, useState } from 'react';
import '../styles/aboutMe.css';
export default function AboutMe() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className={`about-me-title-reveal${visible ? ' visible' : ''}`}>
                <div className="line split"></div>
                <span className="about-me-title-center">About Me</span>
                <div className="line split"></div>
            </div>
            <section id="about-me" className="about-me-section" ref={sectionRef}>
                <div className="about-me-content">
                    <p>I’m a Full Stack Developer who loves building cool things for the web. I’m always learning, always coding, and always up for a new challenge.</p>
                    <p>When I’m not at my computer, you’ll find me gaming, working on side projects, or hanging out with friends. I’m self-taught, curious, and passionate about creating user-friendly experiences.</p>
                    <p>Let’s connect and make something awesome together!</p>
                </div>
            </section>
                <a className="cta-button fade-in" href="/contact" style={{ display: 'block', width: 'fit-content', margin: '2rem auto 0 auto', textAlign: 'center' }}>
                    Contact Me
                </a>
            
        </>
    );
}