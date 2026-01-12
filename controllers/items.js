/* eslint-disable import/extensions */
import Item from "../models/item.js";

export async function getItems(req, res) {
  try {
    const items = await Item.find({});
    return res.status(200).send(items);
  } catch (err) {
    console.error("Error getting items:", err);
    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function createItem(req, res) {
  try {
    const { name, imageUrl, weather } = req.body;

    const item = await Item.create({
      name,
      imageUrl,
      weather,
    });

    return res.status(201).send(item);
  } catch (err) {
    console.error("Error creating item:", err);

    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid item data" });
    }

    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function deleteItem(req, res) {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    await item.deleteOne();

    return res.status(200).send({ message: "Item deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);

    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid item id" });
    }

    return res.status(500).send({ message: "Internal server error" });
  }
}
