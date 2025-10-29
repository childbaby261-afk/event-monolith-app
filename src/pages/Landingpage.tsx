import './Landing.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-box">
        <h1 className="landing-title">
          Welcome to <span className="landing-highlight">Eventify</span>
        </h1>

        <p className="landing-description">
          Plan, manage, and celebrate your events with ease. Whether you're an organizer or an attendee, Eventify brings your gatherings to life.
        </p>

        <div className="landing-buttons">
          <Link to="/login" className="landing-button landing-button-primary">
            Log In
          </Link>
          <Link to="/signup" className="landing-button landing-button-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
