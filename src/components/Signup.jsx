import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signup(name, email, password);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Signup failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{
      backdropFilter: 'blur(4px)'
    }}>
      <div className="recipe-card p-8 w-full max-w-md mx-4" style={{
        background: 'linear-gradient(145deg, #fffdf7, #faf3e6)',
        border: '4px solid #c9a26d',
        borderRadius: '20px',
        boxShadow: `
          0 20px 40px rgba(90, 60, 30, 0.28),
          inset 0 1px 0 rgba(255, 255, 255, 0.85),
          0 0 0 2px rgba(201, 162, 109, 0.28)
        `
      }}>
        <div className="text-center mb-8">
          <h2 className="vintage-title text-3xl text-amber-800 mb-3" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>Join Grandma's Kitchen</h2>
          <p className="vintage-subtitle text-amber-700 text-lg">Create your recipe collection account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-amber-800 mb-2 vintage-subtitle">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="vintage-input w-full px-4 py-3 text-lg"
              style={{
                fontSize: '1rem',
                fontFamily: "'Crimson Text', serif"
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-amber-800 mb-2 vintage-subtitle">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="vintage-input w-full px-4 py-3 text-lg"
              style={{
                fontSize: '1rem',
                fontFamily: "'Crimson Text', serif"
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-amber-800 mb-2 vintage-subtitle">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="vintage-input w-full px-4 py-3 text-lg"
              style={{
                fontSize: '1rem',
                fontFamily: "'Crimson Text', serif"
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-amber-800 mb-2 vintage-subtitle">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="vintage-input w-full px-4 py-3 text-lg"
              style={{
                fontSize: '1rem',
                fontFamily: "'Crimson Text', serif"
              }}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center vintage-subtitle bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="vintage-button w-full py-3 px-4 text-lg font-bold disabled:opacity-50"
            style={{
              background: 'linear-gradient(145deg, #d4af37, #b8941f)',
              border: '3px solid #8b4513',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              boxShadow: `
                0 6px 20px rgba(0, 0, 0, 0.3),
                inset 0 2px 0 rgba(255, 255, 255, 0.3)
              `
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="vintage-subtitle text-amber-700">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-amber-600 hover:text-amber-800 font-bold underline"
            >
              Sign in
            </button>
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-600 hover:text-amber-800 text-2xl font-bold"
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Signup;
