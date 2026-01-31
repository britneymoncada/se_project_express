import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import {
  NOT_FOUND_ERROR,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
} from "./utils/constants.js";

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

// 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).json({ message: NOT_FOUND_MESSAGE });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;

  const message =
    statusCode === INTERNAL_SERVER_ERROR ? SERVER_ERROR_MESSAGE : err.message;

  res.status(statusCode).json({ message });
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
