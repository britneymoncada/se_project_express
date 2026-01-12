import express from "express";
import { getUsers, getCurrentUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/me", getCurrentUser);

export default router;
