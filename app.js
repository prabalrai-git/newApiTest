const express = require("express");
const connectDB = require("./utils/database");
const newsRouter = require("./routes/News-route");
const userRouter = require("./routes/User-route");

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

// middlewares

app.use(express.json());

// Routers

app.use("/api/v1/news/", newsRouter);
app.use("/api/v1/user/", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`db connected and app listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
