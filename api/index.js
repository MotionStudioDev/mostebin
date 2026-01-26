const { Redis } = require('@upstash/redis');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Vercel'in otomatik tanımladığı değişkenleri kullanır
const redis = Redis.fromEnv();

// Kaydetme
app.post('/api/save', async (req, res) => {
    const shortId = Math.random().toString(36).substring(2, 10);
    await redis.set(shortId, req.body.content);
    res.json({ id: shortId });
});

// Getirme
app.get('/api/get/:id', async (req, res) => {
    const content = await redis.get(req.params.id);
    if (!content) return res.status(404).json({ error: "Kod bulunamadı" });
    res.json({ content });
});

module.exports = app;
