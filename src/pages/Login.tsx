import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();

      if (data.token && data.role) {
        login(data.token, data.role);
        navigate(data.role === 'admin' || data.role === 'organizer' ? '/dashboard' : '/events');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login error:', error);
        alert(error.message || 'Something went wrong. Please try again.');
      } else {
        console.error('Unknown error:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>

        <form className="login-form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <label htmlFor="email" className="login-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <span className="login-link">Sign up</span>
        </p>
      </div>
    </div>
  );
}
