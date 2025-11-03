import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Quiz = ({ user, isGuest }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          handleSubmit();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, answers]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/quiz/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }
      const data = await response.json();
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(null));
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!quiz || submitting) return;
    
    setSubmitting(true);

    // Check if all questions are answered
    const unanswered = answers.filter(answer => answer === null).length;
    if (unanswered > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered} unanswered questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) {
        setSubmitting(false);
        return;
      }
    }

    console.log('Submitting quiz with answers:', answers);

    // Calculate results (same for both guest and logged in)
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    
    const result = {
      score,
      totalQuestions: quiz.questions.length,
      percentage: (score / quiz.questions.length) * 100,
      answers: quiz.questions.map((q, i) => ({
        question: q.question,
        userAnswer: answers[i],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        isCorrect: answers[i] === q.correctAnswer
      }))
    };

    console.log('Calculated result:', result);

    // For logged in users, try to save to backend (but don't wait for it)
    if (!isGuest) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Attempting to save results to backend...');
          // Don't await this - just fire and forget
          fetch(`http://localhost:5000/api/quiz/${id}/submit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ answers })
          })
          .then(response => {
            if (response.ok) {
              console.log('Results saved to backend successfully');
            } else {
              console.log('Failed to save to backend, but continuing...');
            }
          })
          .catch(error => {
            console.log('Backend save failed, but continuing...', error);
          });
        }
      } catch (error) {
        console.error('Error saving to backend:', error);
        // Continue anyway - we'll still show results
      }
    }

    // ALWAYS navigate to results immediately with the calculated data
    console.log('Navigating to results page with data');
    navigate('/results', { state: { result, quiz } });
  };

  if (loading) return (
    <div className="quiz-container">
      <div className="container">
        <div className="loading" style={{ textAlign: 'center', padding: '2rem' }}>
          Loading quiz...
        </div>
      </div>
    </div>
  );
  
  if (!quiz) return (
    <div className="quiz-container">
      <div className="container">
        <div className="error" style={{ textAlign: 'center', padding: '2rem' }}>
          Quiz not found
        </div>
      </div>
    </div>
  );

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const answeredQuestions = answers.filter(answer => answer !== null).length;

  return (
    <div className="quiz-container">
      <div className="container">
        <div className="quiz-header">
          <h1>{quiz.title}</h1>
          <p>Question {currentQuestion + 1} of {quiz.questions.length}</p>
          <p>Answered: {answeredQuestions}/{quiz.questions.length}</p>
          
          <div className="quiz-progress">
            <div 
              className="quiz-progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="time-left" style={{ 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: timeLeft < 60 ? '#ef4444' : '#1e293b'
          }}>
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
                disabled={submitting}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || submitting}
            className="btn btn-secondary"
          >
            Previous
          </button>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {currentQuestion === quiz.questions.length - 1 ? (
              <button 
                onClick={handleSubmit}
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={submitting}
                className="btn btn-primary"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;  