import './App.css';

import LandingPage from './components/landingPage';
import Technologies from './components/technologies';
import AboutMe from './components/aboutMe';
import ContactForm from './components/contactMe';
import Experience from './components/experience';
import Projects from './components/projects';

function App() {
  return (
    <div className="snap-container">
      <div className="snap-section">
        <LandingPage />
      </div>
      <div className="snap-section">
        <AboutMe />
      </div>
      <div className="snap-section">
        <Technologies />
      </div>
      <div className="snap-section">
        <Experience />
      </div>
      <div className="snap-section">
        <Projects />
      </div>
      <div className="snap-section">
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
