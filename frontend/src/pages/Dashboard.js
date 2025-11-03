import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPercentageClass = (percentage) => {
    if (percentage >= 80) return 'high';
    if (percentage >= 60) return 'medium';
    return 'low';
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="error">Failed to load dashboard data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, {dashboardData.user.username}! Here's your quiz performance.
        </p>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{dashboardData.stats.totalQuizzes}</div>
            <div className="stat-label">Quizzes Taken</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{dashboardData.stats.averageScore}%</div>
            <div className="stat-label">Average Score</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{dashboardData.stats.highestScore}%</div>
            <div className="stat-label">Highest Score</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">
              {new Date(dashboardData.user.joinedAt).toLocaleDateString()}
            </div>
            <div className="stat-label">Member Since</div>
          </div>
        </div>

        {/* Quiz Results */}
        <div className="results-section">
          <h2 style={{ marginBottom: '2rem', color: 'var(--text-dark)' }}>Quiz History</h2>
          
          {dashboardData.quizResults.length === 0 ? (
            <div className="no-results">
              <p>You haven't taken any quizzes yet.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Take Your First Quiz
              </Link>
            </div>
          ) : (
            <div className="results-table">
              <div className="table-header">
                <div className="table-row">
                  <div>Quiz</div>
                  <div>Score</div>
                  <div>Total Questions</div>
                  <div>Percentage</div>
                  <div>Date</div>
                </div>
              </div>
              
              <div className="table-body">
                {dashboardData.quizResults.map((result, index) => (
                  <div key={index} className="table-row">
                    <div>{result.quizTitle}</div>
                    <div>{result.score}/{result.totalQuestions}</div>
                    <div>{result.totalQuestions}</div>
                    <div className={`percentage ${getPercentageClass(result.percentage)}`}>
                      {Math.round(result.percentage)}%
                    </div>
                    <div>{new Date(result.completedAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Take Another Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;