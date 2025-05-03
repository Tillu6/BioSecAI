const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

// Route handlers
const biometrics = require('./routes/biometrics');
const analytics = require('./routes/analytics');
const profile   = require('./routes/profile');

// Alerts WebSocket initializer
const { initAlerts } = require('./alerts');
// OPA policy evaluator
const { evaluatePolicy } = require('./policyEngine');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Mount middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize WebSocket alerts on the same server
initAlerts(server);

// Mount REST APIs
app.use('/api/biometrics', biometrics);
app.use('/api/analytics', analytics);
app.use('/api/profile', profile);

// Policy evaluation endpoint
app.post('/api/biometrics/policy', async (req, res) => {
  try {
    const decision = await evaluatePolicy(req.body);
    res.json({ decision });
  } catch (err) {
    console.error('Policy eval error:', err);
    res.status(500).json({ error: 'Policy evaluation failed' });
  }
});

// Start server with WebSocket support
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => 
  console.log(`Server & Alerts WS running on port ${PORT}`)
);