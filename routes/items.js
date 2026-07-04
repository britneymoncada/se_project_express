import express from "express";
import {
  getItems,
  createItem,
  likeItem,
  unlikeItem,
  deleteItem,
} from "../controllers/items.js";

import auth from "../middlewares/auth.js";

import { validateCreateItem, validateId } from "../middlewares/validation.js";

const router = express.Router();

// Public route
router.get("/", getItems);

// Protected routes
router.use(auth);

router.post("/", validateCreateItem, createItem);

router.put("/:itemId/likes", validateId, likeItem);

router.delete("/:itemId/likes", validateId, unlikeItem);

router.delete("/:itemId", validateId, deleteItem);

export default router;
