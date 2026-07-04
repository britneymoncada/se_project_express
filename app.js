import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { errors } from "celebrate";

import { requestLogger, errorLogger } from "./middlewares/logger.js";
import router from "./routes/index.js";
import handleErrors from "./utils/handleErrors.js";
import NotFoundError from "./errors/NotFoundError.js";
import { NOT_FOUND_MESSAGE } from "./utils/constants.js";

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
