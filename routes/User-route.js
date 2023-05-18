const express = require("express");
const User = require("../models/User");
var bcrypt = require("bcrypt");

const router = express.Router();

// get all users

router.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ nbHits: user.length, data: user });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

// register user

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    // return console.log(salt, req.body.password.toString());
    const hashedPassword = await bcrypt.hash(
      req.body.password.toString(),
      salt
    );
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

// login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const isPasswordCorrrect = await bcrypt.compare(
      password.toString(),
      user.password
    );
    res.status(200).json({ success: isPasswordCorrrect });
    // console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

module.exports = router;
