import React, { useRef, useEffect, useState } from 'react';
import '../styles/experience.css';

const workData = [
  { title: 'Data Analyst/Developer', company: 'Protame', date: '2024 – 2024', desc: 'Skills: PHP, JavaScript, CSS & HTML' },
  { title: 'Customer service trainee', company: 'FNAC Portugal', date: '2023 – 2023', desc: 'Customer service/Support, sales and product knowledge.' }
];
const eduData = [
  { title: 'High School', school: 'Escola Secundária Gama Barros', date: '2021 - 2024', desc: 'Java, C++, HTML & CSS' },
  { title: 'Bootcamp', school: 'Bytes4Future', date: '2025 - 2025', desc: 'HTML, CSS, JavaScript, React, Node.js, MongoDB, Express, Git, GitHub' },
];

const allEntries = [
  { ...workData[0], side: 'left' },
  { ...eduData[0], side: 'right' },
  { ...workData[1], side: 'left' },
  { ...eduData[1], side: 'right' },
];

function useTypewriter(text, active, speed = 30) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!active || typeof text !== 'string') return;
    
    // Clean the text to remove any potential undefined characters or encoding issues
    const cleanText = text.toString().replace(/undefined/g, '').trim();
    
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < cleanText.length) {
        setDisplayed((prev) => prev + cleanText[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);
  return displayed;
}

function TimelineBranch({ entry, idx, branchVisible, textVisible, trunkHeight, branchSpacing }) {
  const isLeft = entry.side === 'left';
  const top = (idx + 1) * branchSpacing;
  // Temporarily disable typewriter to fix text corruption
  const title = entry.title || '';
  const companyOrSchool = isLeft ? (entry.company || '') : (entry.school || '');
  const date = entry.date || '';
  const desc = entry.desc || '';
  return (
    <div
      className={`timeline-branch-abs ${isLeft ? 'left' : 'right'}`}
      style={{ top: `${top}px` }}
    >
      <div className={`timeline-branch-abs-line ${branchVisible ? 'branch-animate' : ''}`}></div>
      <div className="timeline-content no-bg">
        <strong>{title}</strong>
        <div>{companyOrSchool}</div>
        <div className="timeline-date">{date}</div>
        <div>{desc}</div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [trunkDone, setTrunkDone] = useState(false);
  const [branchesVisible, setBranchesVisible] = useState([false, false, false, false]);
  const [textVisible, setTextVisible] = useState([false, false, false, false]);
  const branchSpacing = 100;
  const trunkHeight = (allEntries.length + 1) * branchSpacing;

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
  useEffect(() => {
    if (!visible) return;
    setTimeout(() => setTrunkDone(true), 800);
  }, [visible]);

  useEffect(() => {
    if (!trunkDone) return;
    let timers = [];
    allEntries.forEach((_, idx) => {
      timers.push(setTimeout(() => {
        setBranchesVisible((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, 400 * idx));
      timers.push(setTimeout(() => {
        setTextVisible((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, 400 * idx + 350));
    });
    return () => timers.forEach(clearTimeout);
  }, [trunkDone]);

  return (
    <section className="technologies-section" ref={sectionRef}>
      <div className={`technologies-title-reveal${visible ? ' visible' : ''}`}> 
        <div className="line split"></div>
        <span className="technologies-title-center">Experience</span>
        <div className="line split"></div>
      </div>
      <div className="timeline-abs-container" style={{ height: trunkHeight + 'px', position: 'relative' }}>
        <div className={`timeline-trunk-abs${trunkDone ? ' trunk-done' : ''}`} style={{ height: trunkHeight + 'px' }}></div>
        {allEntries.map((entry, idx) => (
          <TimelineBranch
            key={idx}
            entry={entry}
            idx={idx}
            branchVisible={branchesVisible[idx]}
            textVisible={textVisible[idx]}
            trunkHeight={trunkHeight}
            branchSpacing={branchSpacing}
          />
        ))}
      </div>
    </section>
  );
} 