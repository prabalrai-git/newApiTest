const express = require("express");
const News = require("../models/News");
const User = require("../models/User");

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
router.get("/curatedNews/:userid", async (req, res) => {
  try {
    const { userid } = req.params;

    // Find the user based on the provided username
    const user = await User.findById({ _id: userid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { preferences, nonPreferences, age } = user;

    // return console.log(preferences, nonPreferences, age);

    const query = News.find({
      $and: [
        {
          category: { $elemMatch: { $in: preferences } }, // At least one category matches preferences
        },
        {
          category: { $nin: nonPreferences }, // Articles not matching non-preferences
        },
      ],
    }).sort("-writtenDate"); // Sort by date in descending order

    const articles = await query.exec();
    console.log(articles);
    res.json({ nbHits: articles.length, data: articles });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// search sorting
router.get("/searchNews/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { search } = req.query;

    // return console.log(search);

    // Find the user based on the provided userid
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { preferences, nonPreferences, age } = user;

    const query = News.find({
      $or: [
        {
          title: { $regex: search, $options: "i" }, // Match search term in title (case-insensitive)
        },
        {
          category: { $elemMatch: { $regex: search, $options: "i" } }, // Match search term in category array (case-insensitive)
        },
      ],
    })
      .sort({ writtenDate: -1 })
      .limit(10); // Sort by writtenDate in descending order

    const articles = await query.exec();

    res.json({ nbHits: articles.length, data: articles });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
