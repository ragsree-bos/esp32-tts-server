
const express = require('express');
const cors = require('cors');
const googleTTS = require('google-tts-api');

const app = express();
app.use(cors());

app.get('/tts', async (req, res) => {
  const text = req.query.text || "Hello from Thara";
  try {
    const url = await googleTTS.getAudioUrl(text, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
    });
    res.redirect(url); // ESP32 should stream this MP3
  } catch (err) {
    console.error(err);
    res.status(500).send("TTS error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ TTS server running at port ${PORT}`);
});
