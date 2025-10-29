import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className="dashboard-container"
      style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
      }}
    >
      <div className="dashboard-box">
        <h1 className="dashboard-title">
          Hello {user?.role === 'admin' ? 'Admin' : 'Organizer'} 👋
        </h1>
        <p className="dashboard-description">
          Welcome to your Eventify dashboard. Here you can manage events, view RSVPs, and track engagement.
        </p>

        <div className="dashboard-grid mb-8">
          <div className="dashboard-card card-1">
            <h2 className="card-title">Create New Event</h2>
            <p className="card-text">Launch a new event and start inviting attendees.</p>
          </div>

          <div className="dashboard-card card-2">
            <h2 className="card-title">View RSVPs</h2>
            <p className="card-text">Check who's attending and manage confirmations.</p>
          </div>

          <div className="dashboard-card card-3">
            <h2 className="card-title">Analytics</h2>
            <p className="card-text">Track engagement and attendance trends.</p>
          </div>

          <div className="dashboard-card card-4">
            <h2 className="card-title">Settings</h2>
            <p className="card-text">Manage your profile and event preferences.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/events" className="dashboard-button">
            View Events
          </Link>
          <button onClick={handleLogout} className="dashboard-button logout">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
