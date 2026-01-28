import express from "express";
import { getCurrentUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

export default router;
