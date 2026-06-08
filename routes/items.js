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

router.get("/", getItems);
router.post("/", auth, validateCreateItem, createItem);

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, unlikeItem);

router.delete("/:itemId", auth, validateId, deleteItem);
export default router;
