import express from 'express';

const router = express.Router();

// In-memory telemetry log store
const telemetryLogs = [];

// POST /api/telemetry
router.post('/', (req, res) => {
  const { metrics, profileType, timestamp } = req.body;

  const logEntry = {
    id: `log_${Date.now()}`,
    timestamp: timestamp || new Date().toISOString(),
    metrics: metrics || {},
    profileType: profileType || 'UNKNOWN',
  };

  telemetryLogs.push(logEntry);

  // Keep last 100 entries in memory
  if (telemetryLogs.length > 100) {
    telemetryLogs.shift();
  }

  res.json({ success: true, logId: logEntry.id });
});

// GET /api/telemetry
router.get('/', (req, res) => {
  res.json({
    totalLogs: telemetryLogs.length,
    recentLogs: telemetryLogs.slice(-10),
  });
});

export default router;
