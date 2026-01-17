import express from "express";
import { createUser, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import usersRouter from "./users.js";
import itemsRouter from "./items.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", login);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
