import express from 'express';

const router = express.Router();

// Mock in-memory user profile store
let userProfiles = {
  default_user: {
    userId: 'default_user',
    profileType: 'VISUAL_DIFFICULTY',
    settings: {
      theme: 'sepia',
      fontFamily: "'Lexend', sans-serif",
      fontSize: 22,
      lineHeight: 2.4,
      letterSpacing: 4,
      directionalAnchors: true,
      lineSpotlight: true,
    },
    updatedAt: new Date().toISOString(),
  },
};

// GET /api/profile/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const profile = userProfiles[userId] || userProfiles.default_user;
  res.json(profile);
});

// POST /api/profile/:userId
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { settings, profileType } = req.body;

  userProfiles[userId] = {
    userId,
    profileType: profileType || 'VISUAL_DIFFICULTY',
    settings: settings || {},
    updatedAt: new Date().toISOString(),
  };

  res.json({ success: true, profile: userProfiles[userId] });
});

export default router;
