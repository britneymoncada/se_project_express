import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import handleErrors from "./utils/handleErrors.js";
import { NOT_FOUND_ERROR, NOT_FOUND_MESSAGE } from "./utils/constants.js";

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

// 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).json({ message: NOT_FOUND_MESSAGE });
});

app.use(handleErrors);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
