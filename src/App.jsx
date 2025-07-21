import './App.css';
import UnderConstruction from './components/underConstruction';
import LandingPage from './components/landingPage';
import Technologies from './components/technologies';

function App() {
  return (
    <div className="snap-container">
      <div className="snap-section">
        <LandingPage />
      </div>
      <div className="snap-section">
        <Technologies />
      </div>
      <div className="snap-section">
        <UnderConstruction />
      </div>
    </div>
  );
}

export default App;
