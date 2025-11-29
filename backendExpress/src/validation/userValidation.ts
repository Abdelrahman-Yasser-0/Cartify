import Joi from "joi";

// export default Joi.object({
//   username: Joi.string().alphanum().min(3).max(30).required(),

//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

//   repeat_password: Joi.ref("password"),

//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
// });
// //   .with("username", "birth_year")
// //   .with("password", "repeat_password");

export const userValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).max(100).required(),

  phone: Joi.string()
    .pattern(/^[0-9+\-\s]{6,20}$/)
    .optional(),

  role: Joi.string().valid("user", "admin").optional(),

  shippingAddress: Joi.object({
    country: Joi.string().max(50).optional(),
    city: Joi.string().max(50).optional(),
    streetAddress: Joi.string().max(100).optional(),
    apartment: Joi.string().max(20).optional(),
    zip: Joi.string().max(20).optional(),
  }).optional(),

  additionalInformation: Joi.object({
    company: Joi.string().max(100).optional(),
    notes: Joi.string().max(300).optional(),
  }).optional(),

  communicationPrefrences: Joi.object({
    email: Joi.boolean().optional(),
    sms: Joi.boolean().optional(),
  }).optional(),
});
