const express = require('express');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title description category difficulty questions');
    
    // Return only quiz metadata, not full questions
    const quizList = quizzes.map(quiz => ({
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      difficulty: quiz.difficulty,
      totalQuestions: quiz.questions.length
    }));
    
    res.json(quizList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit quiz results
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Validate answers array
    if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: 'Invalid answers format' });
    }

    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        score++;
      }
    });

    const percentage = (score / quiz.questions.length) * 100;

    // Update user's quiz results - FIXED: Use User model to find and update
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.quizResults.push({
      quizId: quiz._id,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      completedAt: new Date()
    });

    await user.save();

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      answers: quiz.questions.map((q, i) => ({
        question: q.question,
        userAnswer: answers[i],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        isCorrect: answers[i] === q.correctAnswer
      }))
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
});

module.exports = router;