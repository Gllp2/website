import '../styles/underConstruction.css';

export default function UnderConstruction() {
  return (
    <div className="under-construction">
      <div className="under-construction-emoji" role="img" aria-label="construction">🚧</div>
      <h1>Page Under Construction</h1>
      <div className="under-construction-text">
        <p>I’m working hard to build something awesome for you!</p>
        <span className="fun-message">The page should be ready by 22/7 GMT+1🚀</span>
      </div>
    </div>
  );
}