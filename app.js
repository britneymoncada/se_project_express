/* eslint-disable import/extensions */
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(router);

app.use((req, res, next) => {
  req.user = { _id: "000000000000000000000000" }; // looks like a Mongo ObjectId
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
