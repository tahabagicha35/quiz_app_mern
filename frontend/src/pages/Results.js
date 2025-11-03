import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { result, quiz } = location.state || {};

  // If no data is passed, show error message
  if (!result || !quiz) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h1 style={styles.errorTitle}>No Results Found</h1>
          <p style={styles.errorText}>
            It seems like the quiz results are not available. Please complete a quiz first.
          </p>
          <Link to="/" style={styles.button}>
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, percentage, answers } = result;

  // Determine performance message
  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent! 👍";
    if (percentage >= 70) return "Great Job! 👏";
    if (percentage >= 60) return "Good Work! 😊";
    if (percentage >= 50) return "You Passed! ✅";
    return "Keep Practicing! 📚";
  };

  // Determine score color
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div style={styles.container}>
      {/* Main Results Card */}
      <div style={styles.resultsCard}>
        <h1 style={styles.title}>Quiz Completed! 🎯</h1>
        
        {/* Score Circle */}
        <div style={styles.scoreCircle}>
          <div style={{...styles.scorePercentage, color: getScoreColor(percentage)}}>
            {Math.round(percentage)}%
          </div>
          <div style={styles.scoreText}>Score</div>
        </div>

        {/* Performance Message */}
        <div style={styles.performanceMessage}>
          {getPerformanceMessage(percentage)}
        </div>

        {/* Score Details */}
        <div style={styles.scoreDetails}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Correct Answers:</span>
            <span style={styles.detailValue}>{score} / {totalQuestions}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Quiz:</span>
            <span style={styles.detailValue}>{quiz.title}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Performance:</span>
            <span style={{...styles.detailValue, color: getScoreColor(percentage)}}>
              {percentage >= 70 ? 'Great' : percentage >= 50 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <Link to="/" style={styles.primaryButton}>
            Take Another Quiz
          </Link>
          <Link to="/dashboard" style={styles.secondaryButton}>
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Answers Review Section */}
      <div style={styles.reviewSection}>
        <h2 style={styles.reviewTitle}>Review Your Answers</h2>
        
        {answers && answers.map((answer, index) => (
          <div 
            key={index} 
            style={{
              ...styles.answerCard,
              borderLeft: `4px solid ${answer.isCorrect ? '#10b981' : '#ef4444'}`,
              backgroundColor: answer.isCorrect ? '#f0fdf4' : '#fef2f2'
            }}
          >
            <div style={styles.questionNumber}>Question {index + 1}</div>
            <div style={styles.questionText}>{answer.question}</div>
            
            <div style={styles.answerDetails}>
              <div style={styles.answerRow}>
                <strong>Your Answer:</strong>
                <span style={{ 
                  color: answer.isCorrect ? '#10b981' : '#ef4444',
                  fontWeight: '600'
                }}>
                  {quiz.questions[index]?.options[answer.userAnswer] || 'Not answered'}
                </span>
              </div>
              
              {!answer.isCorrect && (
                <div style={styles.answerRow}>
                  <strong>Correct Answer:</strong>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>
                    {quiz.questions[index]?.options[answer.correctAnswer]}
                  </span>
                </div>
              )}
              
              {answer.explanation && (
                <div style={styles.explanation}>
                  <strong>Explanation: </strong>
                  {answer.explanation}
                </div>
              )}
              
              <div style={styles.status}>
                Status: 
                <span style={{ 
                  color: answer.isCorrect ? '#10b981' : '#ef4444',
                  fontWeight: '600',
                  marginLeft: '5px'
                }}>
                  {answer.isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  errorContainer: {
    background: 'white',
    borderRadius: '15px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: '50px auto'
  },
  errorTitle: {
    color: '#ef4444',
    marginBottom: '15px',
    fontSize: '24px'
  },
  errorText: {
    color: '#64748b',
    marginBottom: '25px',
    fontSize: '16px'
  },
  resultsCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '20px auto'
  },
  title: {
    color: '#1e293b',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  scoreCircle: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '3px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
  },
  scorePercentage: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  scoreText: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500'
  },
  performanceMessage: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '25px'
  },
  scoreDetails: {
    background: '#f8fafc',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  detailItemLast: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0'
  },
  detailLabel: {
    color: '#64748b',
    fontWeight: '500'
  },
  detailValue: {
    color: '#1e293b',
    fontWeight: '600'
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    display: 'inline-block'
  },
  primaryButton: {
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    display: 'inline-block'
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#6366f1',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    border: '2px solid #6366f1',
    display: 'inline-block'
  },
  reviewSection: {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '20px auto'
  },
  reviewTitle: {
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  answerCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '15px',
    border: '1px solid #e2e8f0'
  },
  questionNumber: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '8px'
  },
  questionText: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '15px',
    lineHeight: '1.4'
  },
  answerDetails: {
    padding: '15px',
    background: 'rgba(248, 250, 252, 0.5)',
    borderRadius: '8px'
  },
  answerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '5px 0'
  },
  explanation: {
    background: 'white',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '10px',
    borderLeft: '3px solid #6366f1',
    fontSize: '14px',
    color: '#475569'
  },
  status: {
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #e2e8f0',
    fontWeight: '500',
    color: '#64748b'
  }
};

export default Results;