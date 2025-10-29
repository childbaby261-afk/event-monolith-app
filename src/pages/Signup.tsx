import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { API_BASE_URL } from '../api/config'; // ✅ use centralized API base URL

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // ✅ Updated fetch call to use API_BASE_URL dynamically
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      // ✅ Handle response
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await res.json();

      // ✅ Successful signup
      if (data.token && data.role) {
        login(data.token, data.role);
        navigate(data.role === 'admin' || data.role === 'organizer' ? '/dashboard' : '/events');
      } else {
        throw new Error('Invalid response from server');
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Signup error:', error);
        alert(error.message || 'Something went wrong. Please try again.');
      } else {
        console.error('Unknown error:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>

        <form
          className="signup-form"
          onSubmit={e => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <label htmlFor="name" className="signup-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={e => setName(e.target.value)}
            className="signup-input"
            required
          />

          <label htmlFor="email" className="signup-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="signup-input"
            required
          />

          <label htmlFor="password" className="signup-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="signup-input"
            required
          />

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <span className="signup-link">Log in</span>
        </p>
      </div>
    </div>
  );
}
