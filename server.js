const express = require('express');
const path = require('path');
const app = express();
let requestCount = 0;

// Middleware: count every request
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Serve static HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get traffic count
app.get('/traffic', (req, res) => {
    res.json({ count: requestCount });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
