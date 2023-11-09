const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const router = require("./assets/routes/");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dangle PC Backend." });
});

app.use("/api/", router)

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((error, req, res) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;