import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import QuizSelection from './pages/QuizSelection';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const enterAsGuest = () => {
    setUser({ username: 'Guest' });
    setIsGuest(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} isGuest={isGuest} onLogout={logout} />
        <Routes>
          <Route 
            path="/" 
            element={
              user ? <QuizSelection /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/login" 
            element={
              !user ? <Login onLogin={login} onGuest={enterAsGuest} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/signup" 
            element={
              !user ? <SignUp onLogin={login} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/quiz/:id" 
            element={<Quiz user={user} isGuest={isGuest} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              user && !isGuest ? <Dashboard /> : <Navigate to="/login" />
            } 
          />
          {/* FIX: Make sure Results route is accessible to everyone */}
          <Route 
            path="/results" 
            element={<Results />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;