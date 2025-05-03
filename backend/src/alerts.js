const WebSocket = require('ws');

// Attach to existing HTTP server in server.js
function initAlerts(server) {
  const wss = new WebSocket.Server({ server, path: '/alerts' });

  wss.on('connection', ws => {
    console.log('Client connected to alerts');
    // Example: push a heartbeat or test alert every 30s
    const interval = setInterval(() => {
      ws.send(JSON.stringify({ message: 'Heartbeat check', timestamp: Date.now() }));
    }, 30000);

    ws.on('close', () => clearInterval(interval));
  });
}

module.exports = { initAlerts };