const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app = express();  // <-- create the app BEFORE using app.get()

// ----- Routes -----
app.get('/locust-stats', async (req, res) => {
    try {
        const r = await fetch('http://4.144.183.18:8089/stats/requests');
        const json = await r.json();
        res.json({ user_count: json.user_count });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch Locust stats' });
    }
});

// serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
