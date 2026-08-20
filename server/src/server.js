import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import explainRouter from './routes/explain.js';
import practiceRouter from './routes/practice.js';
import profileRouter from './routes/profile.js';
import telemetryRouter from './routes/telemetry.js';
import directionSimplifierRouter from './routes/directionSimplifier.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/explain', explainRouter);
app.use('/api/generate-mcq', practiceRouter);
app.use('/api/profile', profileRouter);
app.use('/api/telemetry', telemetryRouter);
app.use('/api/simplify-directions', directionSimplifierRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'LexiSight AI Backend & Directional Intelligence Server',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 LexiSight AI Intelligence Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});
