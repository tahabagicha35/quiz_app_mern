import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, isGuest, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            QuizMaster
          </Link>
          
          <div className="nav-links">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Quizzes
                </Link>
                
                {!isGuest && (
                  <Link 
                    to="/dashboard" 
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <span className="nav-link">
                  Welcome, {user.username}
                  {isGuest && ' (Guest)'}
                </span>
                
                <button onClick={onLogout} className="btn btn-danger">
                  {isGuest ? 'Exit Guest Mode' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;