const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

app.get('/locust-stats', async (req, res) => {
    const r = await fetch('http://57.158.141.77:8089/stats/requests');
    const json = await r.json();
    res.json({ user_count: json.user_count });
});
