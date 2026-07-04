import { celebrate, Joi, Segments } from "celebrate";
import validator from "validator";

export const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validator.isURL(value)) {
          return helpers.error("string.uri");
        }
        return value;
      }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateCreateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid("hot", "warm", "cold"),
    imageUrl: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validator.isURL(value)) {
          return helpers.error("string.uri");
        }
        return value;
      }),
  }),
});

export const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

export const validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validator.isURL(value)) {
          return helpers.error("string.uri");
        }
        return value;
      }),
  }),
});
