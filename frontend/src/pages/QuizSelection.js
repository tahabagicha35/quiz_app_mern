import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuizSelection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quiz');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="quiz-selection">
        <div className="container">
          <div className="loading">Loading quizzes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-selection">
      <div className="container">
        <h1 className="page-title">Choose Your Quiz</h1>
        <p className="page-subtitle">
          Test your knowledge with our curated collection of quizzes
        </p>
        
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h3 className="quiz-title">{quiz.title}</h3>
              <p className="quiz-description">{quiz.description}</p>
              
              <div className="quiz-meta">
                <span className="quiz-tag">{quiz.category}</span>
                <span className="quiz-tag">{quiz.difficulty}</span>
                <span className="quiz-tag">{quiz.totalQuestions} Questions</span>
              </div>
              
              <Link to={`/quiz/${quiz._id}`} className="btn btn-primary">
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;