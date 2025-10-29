import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';
import './CreateEvent.css';

// ✅ Backend API base URL (uses .env if set, otherwise defaults to localhost)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

export default function CreateEvent() {
  const { role, token } = useAuth();

  // ✅ State for event form fields
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });

  // ✅ Redirect if not admin or organizer
  if (role !== 'admin' && role !== 'organizer') {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission (with token authorization)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send token for authentication
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create event');
      }

      alert('🎉 Event created successfully!');
      console.log('Created event:', data);

      // ✅ Reset form after successful creation
      setFormData({
        title: '',
        date: '',
        location: '',
        description: '',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating event:', error.message);
        alert(error.message || 'Something went wrong. Please try again.');
      } else {
        console.error('Unknown error:', error);
        alert('Unexpected error occurred.');
      }
    }
  };

  // ✅ UI for event creation
  return (
    <div className="create-event-container">
      <div className="create-event-box">
        <h2 className="create-event-title">Create New Event 🎉</h2>

        <form onSubmit={handleSubmit} className="create-event-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="create-event-input"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="create-event-input"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="create-event-input"
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="create-event-textarea"
            required
          />

          <button type="submit" className="create-event-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
