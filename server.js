const express = require("express");
const cors = require("cors");
const gTTS = require("gtts");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/tts", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.status(400).send("Missing text");

  const tts = new gTTS(text, "en");
  res.set({ "Content-Type": "audio/mpeg" });
  tts.stream().pipe(res);
});

app.get("/", (req, res) => {
  res.send("ESP32 TTS Server is running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
