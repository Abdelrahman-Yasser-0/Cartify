import Joi from "joi";

export const createOfferValidation = Joi.object({
  productId: Joi.any(),
  // userId: Joi.any(),
  discountType: Joi.string().valid("percentage", "fixed"),
  value: Joi.number(),
});

export default createOfferValidation;
