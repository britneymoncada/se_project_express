import express from "express";
import { createUser, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import itemsRouter from "./items.js";
import usersRouter from "./users.js";

const router = express.Router();

router.post("/signin", login);
router.post("/signup", createUser);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
