import Joi from "joi";

export const addToCartValidation = Joi.object({
  productId: Joi.any(),
  // userId: Joi.any(),
  quantity: Joi.number(),
});
