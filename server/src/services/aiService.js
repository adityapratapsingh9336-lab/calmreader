import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
let aiClient = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here') {
  try {
    aiClient = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.warn('Gemini API Client initialization failed, falling back to mock mode:', err.message);
  }
}

function parseCleanJson(text) {
  if (!text) return null;
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned);
}

/**
 * Generate AI Word Explanation & Syllable Breakdown
 */
export async function explainWord(word, contextSentence = '') {
  if (!aiClient) {
    return {
      word: word,
      syllables: word.length > 5 ? `${word.slice(0, 3)}·${word.slice(3)}` : word,
      simpleDefinition: `A core vocabulary word meaning related to "${word.toLowerCase()}" as used in reading contexts.`,
      visualTags: ['visual-cognition', 'word-memory', 'vocabulary'],
      exampleSentence: `Mastering the word "${word}" enhances visual reading fluency.`
    };
  }

  try {
    const prompt = `
You are an expert assistive reading AI for dyslexic students.
Explain the word "${word}" derived from context: "${contextSentence}".
Return ONLY a valid JSON object matching this exact schema:
{
  "word": "${word}",
  "syllables": "syllable breakdown separated by dots e.g. con·struc·tion",
  "simpleDefinition": "simple plain-language 1-sentence definition suitable for a 10 year old",
  "visualTags": ["tag1", "tag2", "tag3"],
  "exampleSentence": "A short, easy example sentence using the word"
}
`;

    const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(prompt);
    const jsonText = response.response.text();
    return parseCleanJson(jsonText);
  } catch (err) {
    console.error('Error generating AI explanation:', err);
    return {
      word: word,
      syllables: word,
      simpleDefinition: `A word representing ${word.toLowerCase()}.`,
      visualTags: ['visual-cue'],
      exampleSentence: `Practice reading "${word}" regularly.`
    };
  }
}

/**
 * Generate 5 AI Multiple-Choice Questions from Passage
 */
export async function generateMCQQuiz(passageText) {
  const fallbackQuiz = {
    questions: [
      {
        id: 1,
        question: "What is the primary visual challenge addressed by directional anchors?",
        options: ["Auditory pitch loss", "Letter reversal flips (b/d/p/q)", "Font download speed", "Color blindness"],
        correctIndex: 1,
        explanation: "Directional anchors attach visual cues to b, d, p, and q to suppress mirror invariance."
      },
      {
        id: 2,
        question: "How does spatial kerning expansion help Dyseidetic dyslexic readers?",
        options: ["Reduces lateral visual crowding noise", "Makes text darker", "Speaks text out loud", "Changes language"],
        correctIndex: 0,
        explanation: "Increasing character pitch separates flanking glyphs, preventing visual crowding."
      },
      {
        id: 3,
        question: "What function does the Focus Spotlight serve during active reading?",
        options: ["Translates text", "Dims non-active lines to prevent saccadic drift", "Generates audio", "Inverts background"],
        correctIndex: 1,
        explanation: "Focus spotlight keeps the eyes landing on the target reading line."
      }
    ]
  };

  if (!aiClient) {
    return fallbackQuiz;
  }

  try {
    const prompt = `
Generate 3 multiple-choice comprehension questions based on this text passage:
"${passageText.slice(0, 1000)}"

Return ONLY a valid JSON object matching this exact schema:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why option A is correct."
    }
  ]
}
`;

    const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(prompt);
    return parseCleanJson(response.response.text());
  } catch (err) {
    console.error('Error generating AI MCQ quiz, returning fallback:', err);
    return fallbackQuiz;
  }
}

/**
 * Simplify Complex Instructional Text into Directional Step Objects
 */
export async function simplifyDirectionsText(text) {
  const generateMockSteps = (inputStr) => {
    const sentences = inputStr.split(/(?<=[.!?])\s+/).filter(Boolean);
    const mockSteps = (sentences.length > 0 ? sentences : [inputStr]).map((sentence, idx) => {
      const lower = sentence.toLowerCase();
      let direction = 'NONE';
      let color = 'slate';
      let icon = '•';

      if (lower.includes('left') || lower.includes('west')) {
        direction = 'LEFT';
        color = 'blue';
        icon = '←';
      } else if (lower.includes('right') || lower.includes('east')) {
        direction = 'RIGHT';
        color = 'red';
        icon = '→';
      } else if (lower.includes('up') || lower.includes('north')) {
        direction = 'UP';
        color = 'green';
        icon = '↑';
      } else if (lower.includes('down') || lower.includes('south')) {
        direction = 'DOWN';
        color = 'yellow';
        icon = '↓';
      }

      return {
        stepNumber: idx + 1,
        action: sentence.trim(),
        direction,
        color,
        icon,
      };
    });

    return { steps: mockSteps };
  };

  if (!aiClient) {
    return generateMockSteps(text);
  }

  try {
    const prompt = `
Parse the following text into step-by-step directional actions for a dyslexic student:
"${text.slice(0, 1500)}"

Return ONLY a valid JSON object matching this exact schema:
{
  "steps": [
    {
      "stepNumber": 1,
      "action": "Short step action text",
      "direction": "LEFT" | "RIGHT" | "UP" | "DOWN" | "NONE",
      "color": "blue" | "red" | "green" | "yellow" | "slate",
      "icon": "←" | "→" | "↑" | "↓" | "•"
    }
  ]
}
`;

    const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(prompt);
    return parseCleanJson(response.response.text());
  } catch (err) {
    console.error('Error in simplifyDirectionsText, returning fallback:', err);
    return generateMockSteps(text);
  }
}
