const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Vercel'in otomatik bağladığı değişkeni kullanıyoruz
mongoose.connect(process.env.MONGODB_URI);

const Paste = mongoose.model('Paste', { content: String, shortId: String });

app.post('/api/save', async (req, res) => {
    const shortId = Math.random().toString(36).substring(2, 10);
    await new Paste({ content: req.body.content, shortId }).save();
    res.json({ id: shortId });
});

app.get('/api/get/:id', async (req, res) => {
    const paste = await Paste.findOne({ shortId: req.params.id });
    if (!paste) return res.status(404).json({ error: "Bulunamadı" });
    res.json({ content: paste.content });
});

module.exports = app;
