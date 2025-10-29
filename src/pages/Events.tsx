import './Events.css';
import { useState, useEffect } from 'react';

// Backend base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from backend on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading events...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div className="eventlist-container">
      <h1 className="eventlist-title">
        Upcoming <span className="eventlist-highlight">Events</span>
      </h1>
      <p className="eventlist-description">
        Discover what’s happening near you. Whether you’re attending or organizing, Eventify keeps you connected.
      </p>

      <div className="eventlist-cards">
        {events.map(event => (
          <div key={event.id} className="eventlist-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
