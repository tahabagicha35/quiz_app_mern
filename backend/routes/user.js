const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const router = express.Router();

// Get user dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('quizResults.quizId');
    
    const quizResults = user.quizResults.map(result => ({
      quizTitle: result.quizId?.title || 'Unknown Quiz',
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      completedAt: result.completedAt
    }));

    // Calculate stats
    const totalQuizzes = user.quizResults.length;
    const averageScore = totalQuizzes > 0 
      ? user.quizResults.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes 
      : 0;
    
    const highestScore = totalQuizzes > 0 
      ? Math.max(...user.quizResults.map(result => result.percentage))
      : 0;

    res.json({
      user: {
        username: user.username,
        email: user.email,
        joinedAt: user.createdAt
      },
      stats: {
        totalQuizzes,
        averageScore: Math.round(averageScore),
        highestScore: Math.round(highestScore)
      },
      quizResults: quizResults.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;