import React, { useRef, useEffect, useState } from 'react';
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiMongodb, SiSqlite, SiFigma, SiCanva, SiGithub, SiGit, SiTailwindcss, SiCplusplus
} from 'react-icons/si';
import { FaRegQuestionCircle, FaJava } from 'react-icons/fa';
import '../styles/technologies.css';

const techStack = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#1C9CD7' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'SQLite', icon: SiSqlite, color: '#4DB6E2' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
  { name: 'GitHub', icon: SiGithub, color: '#181717' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'Java', icon: FaJava, color: '#007396' },
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
        <span className="technologies-title-center">Tools i use</span>
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
            </div>
          );
        })}
      </div>
    </section>
  );
}