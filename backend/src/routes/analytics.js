const router = require('express').Router();

// In-memory placeholder for counts:
let authCounts = [];

// Simulate adding a count record whenever authentication occurs:
router.post('/record', (req, res) => {
  const now = Date.now();
  authCounts.push({ timestamp: now, count: 1 });
  res.json({ success: true });
});

// Aggregate and return trends:
router.get('/', (req, res) => {
  // Simple grouping by minute:
  const grouped = authCounts.reduce((acc, { timestamp, count }) => {
    const minute = new Date(timestamp).toISOString().slice(0,16);
    acc[minute] = (acc[minute] || 0) + count;
    return acc;
  }, {});
  // Convert into array sorted by timestamp:
  const data = Object.entries(grouped)
    .map(([timestamp, count]) => ({ timestamp, count }))
    .sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
  res.json(data);
});

module.exports = router;