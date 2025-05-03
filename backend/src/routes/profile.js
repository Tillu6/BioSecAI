const router = require('express').Router();

// In-memory user settings store
const settings = { threshold: 0.5 };

// Get settings
router.get('/', (req, res) => {
  res.json(settings);
});

// Update settings
router.post('/', (req, res) => {
  const { threshold } = req.body;
  if (threshold >= 0 && threshold <=1) {
    settings.threshold = threshold;
    return res.json({ success: true, settings });
  }
  res.status(400).json({ error: 'Invalid threshold' });
});

module.exports = router;