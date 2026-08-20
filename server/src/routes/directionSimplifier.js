import express from 'express';
import { simplifyDirectionsText } from '../services/aiService.js';

const router = express.Router();

// POST /api/simplify-directions
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    const simplifiedData = await simplifyDirectionsText(text);
    return res.json(simplifiedData);
  } catch (error) {
    console.error('API Error in /simplify-directions:', error);
    return res.status(500).json({ error: 'Failed to simplify directional text' });
  }
});

export default router;
