import Item from "../models/item.js";
import {
  INVALID_DATA_MESSAGE,
  NOT_FOUND_MESSAGE,
  FORBIDDEN_MESSAGE,
} from "../utils/constants.js";

import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import ForbiddenError from "../errors/ForbiddenError.js";

// GET
export const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

// POST
export const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    return next(new BadRequestError(INVALID_DATA_MESSAGE));
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
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }
      return next(err);
    });
};

// PUT
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
        return next(new NotFoundError(NOT_FOUND_MESSAGE));
      }
      return res.send(item); // 200 OK
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }
      return next(err);
    });
};

// DELETE
export const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  Item.findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .then((item) => {
      if (!item) {
        return next(new NotFoundError(NOT_FOUND_MESSAGE));
      }
      return res.send(item); // 200 OK
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }
      return next(err);
    });
};

// DELETE
export const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError(NOT_FOUND_MESSAGE));
      }

      if (item.owner.toString() !== userId.toString()) {
        return next(new ForbiddenError(FORBIDDEN_MESSAGE));
      }

      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }
      return next(err);
    });
};
