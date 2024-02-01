const express = require("express");
const router = express.Router();
const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { createToken } = require("../utils/token");

router.get("/search", authMiddleware.authenticateJWT, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const query = req.query.query;
    const musicData = await musicController.fetchMusicData(query);
    res.json(musicData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/authenticate", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ token: createToken() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
