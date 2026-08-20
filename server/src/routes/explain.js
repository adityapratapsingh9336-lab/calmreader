import express from 'express';
import { explainWord } from '../services/aiService.js';

const router = express.Router();

// POST /api/explain
router.post('/', async (req, res) => {
  try {
    const { word, contextSentence } = req.body;
    if (!word) {
      return res.status(400).json({ error: 'Word parameter is required' });
    }

    const explanation = await explainWord(word, contextSentence);
    return res.json(explanation);
  } catch (error) {
    console.error('API Error in /explain:', error);
    return res.status(500).json({ error: 'Failed to generate word explanation' });
  }
});

export default router;
