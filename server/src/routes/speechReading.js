import express from 'express';
import multer from 'multer';
import Groq, { toFile } from 'groq-sdk';
import { alignReading } from '../utils/readingComparator.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
});

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey && apiKey !== 'your_groq_api_key_here') {
    try {
      return new Groq({ apiKey });
    } catch (err) {
      console.warn('Groq client init error:', err);
    }
  }
  return null;
}

/**
 * Transcribe Audio Buffer using Groq Whisper API (whisper-large-v3)
 */
async function transcribeAudioWithGroq(buffer, mimeType = 'audio/webm') {
  const client = getGroqClient();
  if (!client) {
    throw new Error('GROQ_API_KEY is not configured on server');
  }

  const audioFile = await toFile(buffer, 'recording.webm', {
    type: mimeType || 'audio/webm',
  });

  const transcription = await client.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-large-v3',
    response_format: 'verbose_json',
    language: 'en',
    temperature: 0.0,
  });

  return transcription.text || '';
}

/**
 * POST /api/analyze-reading
 * Supports both:
 * 1. multipart/form-data (audio file + originalText) -> Transcribes via Groq Whisper + compares
 * 2. application/json (spokenText + originalText) -> Compares directly
 */
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const originalText = req.body?.originalText || '';
    let spokenText = req.body?.spokenText || '';
    let transcriptionSource = 'direct_text';

    // If audio file is provided, transcribe with Groq Whisper
    if (req.file) {
      if (getGroqClient()) {
        try {
          spokenText = await transcribeAudioWithGroq(
            req.file.buffer,
            req.file.mimetype
          );
          transcriptionSource = 'groq_whisper_v3';
        } catch (transcribeErr) {
          console.error('Groq Whisper API error:', transcribeErr);
          // If Groq fails, use fallback spoken text if passed in body, or provide mock transcription
          spokenText = req.body?.spokenText || originalText;
          transcriptionSource = 'fallback_mode';
        }
      } else {
        // Fallback demo mode when GROQ_API_KEY is not set
        spokenText = req.body?.spokenText || originalText;
        transcriptionSource = 'demo_offline_mode';
      }
    }

    if (!originalText && !spokenText) {
      return res.status(400).json({
        error: 'originalText or audio/spokenText is required for reading analysis',
      });
    }

    // Run Text Comparison & Phonics Diagnostics Engine
    const analysis = alignReading(originalText, spokenText);

    return res.json({
      success: true,
      originalText,
      spokenText,
      transcriptionSource,
      accuracy: analysis.accuracy,
      stats: analysis.stats,
      tokens: analysis.tokens,
      mistakes: analysis.mistakes,
      phonicsInsights: analysis.phonicsInsights,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /analyze-reading:', error);
    return res.status(500).json({
      error: 'Failed to analyze reading speech',
      details: error.message,
    });
  }
});

export default router;
