import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./items.js";

const router = express.Router();

router.use(usersRouter);
router.use(itemsRouter);

export default router;
