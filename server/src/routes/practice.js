import express from 'express';
import { generateMCQQuiz } from '../services/aiService.js';

const router = express.Router();

// POST /api/generate-mcq
router.post('/', async (req, res) => {
  try {
    const { passageText } = req.body;
    if (!passageText) {
      return res.status(400).json({ error: 'Passage text parameter is required' });
    }

    const quizData = await generateMCQQuiz(passageText);
    return res.json(quizData);
  } catch (error) {
    console.error('API Error in /generate-mcq:', error);
    return res.status(500).json({ error: 'Failed to generate practice quiz' });
  }
});

export default router;
