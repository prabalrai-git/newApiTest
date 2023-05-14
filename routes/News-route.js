const express = require("express");
const News = require("../models/News");

const router = express.Router();

// get all news

router.get("/", async (req, res) => {
  try {
    const news = await News.find({});
    res.status(200).json({ nbHits: news.length, data: news });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

// post a news

router.post("/", async (req, res) => {
  try {
    const newNews = await News.create(req.body);
    res.status(200).json({ success: true, data: newNews });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

// increase view

router.post("/countViews/:id", async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const firstNews = await News.findById(query);

    await News.findOneAndUpdate(query, {
      $set: { views: firstNews.views + 1 },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

module.exports = router;
