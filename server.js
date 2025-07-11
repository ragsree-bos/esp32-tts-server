
  const express = require('express');
const cors = require('cors');
const fs = require('fs');
const gTTS = require('gtts');

const app = express();
app.use(cors());

app.get('/tts', (req, res) => {
  const text = req.query.text || 'Hello from Thara';
  const file = '/tmp/output.wav';

  const gtts = new gTTS(text, 'en');
  gtts.save(file, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("TTS Error");
      return;
    }

    res.set({ 'Content-Type': 'audio/wav' });
    const stream = fs.createReadStream(file);
    stream.pipe(res);
    stream.on('close', () => fs.unlinkSync(file));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TTS Server running on port ${PORT}`));

