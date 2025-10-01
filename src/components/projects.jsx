import React, { useRef, useEffect, useState } from 'react';
import '../styles/projects.css';

export default function Projects() {
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
        <section className="technologies-section" ref={sectionRef}>
            <div className={`technologies-title-reveal${visible ? ' visible' : ''}`}>
                <div className="line split"></div>
                <span className="technologies-title-center">Projects</span>
                <div className="line split"></div>
            </div>
            <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                <p>Under Construction</p>
            </div>
        </section>
    );
} 