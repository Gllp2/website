import './App.css';

import LandingPage from './components/landingPage';
import Technologies from './components/technologies';
import AboutMe from './components/aboutMe';
import ContactForm from './components/contactMe';

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
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
