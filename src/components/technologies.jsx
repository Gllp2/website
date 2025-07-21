import React, { useRef, useEffect, useState } from 'react';
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiMongodb, SiSqlite, SiFigma, SiCanva, SiGithub, SiGit, SiTailwindcss, SiCplusplus
} from 'react-icons/si';
import { FaRegQuestionCircle, FaJava } from 'react-icons/fa';
import '../styles/technologies.css';

const techStack = [
  { icon: SiHtml5, color: '#E34F26' },
  { icon: SiCss3, color: '#1572B6' },
  { icon: SiJavascript, color: '#F7DF1E' },
  { icon: SiTypescript, color: '#3178C6' },
  { icon: SiNodedotjs, color: '#339933' },
  { icon: SiReact, color: '#61DAFB' },
  { icon: SiMongodb, color: '#47A248' },
  { icon: SiSqlite, color: '#003B57' },
  { icon: SiFigma, color: '#F24E1E' },
  { icon: SiCanva, color: '#00C4CC' },
  { icon: SiGithub, color: '#181717' },
  { icon: SiGit, color: '#F05032' },
  { icon: SiTailwindcss, color: '#06B6D4' },
  { icon: SiCplusplus, color: '#00599C' },
  { icon: FaJava, color: '#007396' },
];

export default function Technologies() {
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
        <span className="technologies-title-center">Technologies</span>
        <div className="line split"></div>
      </div>
      <div className="technologies-list">
        {techStack.map((tech, idx) => {
          const Icon = tech.icon || FaRegQuestionCircle;
          return (
            <div
              className={`technologies-item wave-animate${visible ? ' visible' : ''}`}
              style={{
                transitionDelay: visible ? `${idx * 100}ms` : '0ms',
              }}
              key={tech.name}
            >
              <Icon size={56} color={tech.color} className="tech-icon" />
              <span className="tech-label">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}