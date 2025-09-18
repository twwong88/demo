const express = require('express');
const path = require('path');
const app = express();

// Track concurrent sessions
const activeSessions = new Set();
const SESSION_TIMEOUT = 5000; // 5 seconds for demo

app.use((req, res, next) => {
    // Simple client ID: IP + User-Agent
    const clientId = req.ip + (req.headers['user-agent'] || '');

    // Add client to active sessions
    activeSessions.add(clientId);

    // Remove after SESSION_TIMEOUT
    setTimeout(() => activeSessions.delete(clientId), SESSION_TIMEOUT);

    next();
});

// Serve the demo page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get current concurrent sessions
app.get('/traffic', (req, res) => {
    res.json({ concurrent: activeSessions.size });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
