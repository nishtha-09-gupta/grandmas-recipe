import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import RecipeFinder from './components/RecipeFinder';
import './App.css';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 50%, #d4c4a8 100%)',
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.1) 1px, transparent 0),
        linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 50%, #d4c4a8 100%)
      `,
      backgroundSize: '20px 20px, 100% 100%'
    }}>
      <nav className="relative z-20" style={{
        background: 'linear-gradient(145deg, #b08968, #9c7350)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        borderBottom: '4px solid #7a5c3a'
      }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="vintage-title text-3xl text-amber-100" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))'
              }}>
                🍳 Grandma's Kitchen
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="vintage-subtitle text-amber-100 text-lg">Welcome, {user.name}!</span>
                  <button
                    onClick={logout}
                    className="vintage-button px-6 py-2 text-sm font-bold"
                    style={{
                      background: 'linear-gradient(145deg, #6b7280, #4b5563)',
                      border: '2px solid #374151',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200"
                    style={{
                      background: 'linear-gradient(145deg, #fef3c7, #fde68a)',
                      color: '#92400e',
                      border: '2px solid #d4af37',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(145deg, #fde68a, #fcd34d)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(145deg, #fef3c7, #fde68a)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    → Sign In
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="vintage-button px-6 py-2 text-sm font-bold"
                    style={{
                      background: 'linear-gradient(145deg, #d4af37, #b8941f)',
                      border: '2px solid #8b4513',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    👤 Join
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<RecipeFinder />} />
      </Routes>

    
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
