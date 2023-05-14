const express = require("express");
const User = require("../models/User");

const router = express.Router();

// get all news

router.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ nbHits: user.length, data: user });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

// post a news

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

module.exports = router;
