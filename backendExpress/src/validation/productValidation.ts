import Joi from "joi";
export const productValidation = Joi.object({
  title: Joi.string().min(2).max(200).required(),

  brand: Joi.string().min(2).max(100).required(),

  price: Joi.number().min(0).required(),

  quantity: Joi.number().min(0).required(),

  rate: Joi.string().optional(),
  originalPrice: Joi.number().min(0).optional(),

  discount: Joi.number().min(0).max(100).optional(),

  imgurl: Joi.string().uri().optional(),

  sku: Joi.string().optional(),

  category: Joi.string().optional(),

  colors: Joi.array().items(Joi.string()).optional(),

  description: Joi.string().optional(),

  specifications: Joi.array().items(Joi.string()).optional(),

  reviews: Joi.array()
    .items(
      Joi.object({
        author: Joi.string().optional(),
        rating: Joi.number().min(1).max(5).optional(),
        comment: Joi.string().optional(),
        date: Joi.string().optional(),
      })
    )
    .optional(),

  shortDescription: Joi.string().optional(),
});
