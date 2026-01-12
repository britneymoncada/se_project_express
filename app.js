/* eslint-disable import/extensions */
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
