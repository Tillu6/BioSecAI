const router = require('express').Router();
const ks = require('../services/keystrokeService');
const ms = require('../services/mouseService');
const gs = require('../services/gestureService');

// Behavioural biometric endpoints
router.post('/keystroke', ks.handleKeystroke);
router.post('/mouse',    ms.handleMouse);
router.post('/gesture',  gs.handleGesture);

// Emotion‑AI profiling stub for frontend rendering
router.get('/emotion', (req, res) => {
  // Sample payload for testing the radial chart
  const sample = [
    { label: 'Happy',   confidence: 0.7 },
    { label: 'Neutral', confidence: 0.2 },
    { label: 'Sad',     confidence: 0.1 }
  ];
  res.json(sample);
});

module.exports = router;
