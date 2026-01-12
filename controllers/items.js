/* eslint-disable import/extensions */
import Item from "../models/item.js";

// GET /items
export const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

// POST /items
export const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    return res.status(400).send({ message: "Invalid item data" });
  }

  return Item.create({
    name,
    weather,
    imageUrl,
    owner,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid item data" });
      }
      return next(err);
    });
};

// PUT /items/:itemId/likes
export const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  Item.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: "Requested resource not found" });
      }
      return res.send(item); // 200 OK
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }
      return next(err);
    });
};

// DELETE /items/:itemId/likes
export const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  Item.findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: "Requested resource not found" });
      }
      return res.send(item); // 200 OK
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }
      return next(err);
    });
};

// DELETE /items/:itemId
export const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: "Requested resource not found" });
      }

      if (item.owner.toString() !== userId) {
        return res.status(403).send({ message: "Forbidden" });
      }

      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }
      return next(err);
    });
};
