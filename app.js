const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/database");
const newsRouter = require("./routes/News-route");
const userRouter = require("./routes/User-route");
const authRouter = require("./routes/auth-route");
const passport = require("passport");
const session = require("express-session");
require("./passport");

require("dotenv").config();
const app = express();

// middleware
app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(cookieSession());

// routes

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/v1/news/", newsRouter);
app.use("/api/v1/user/", userRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`db connected and app listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
