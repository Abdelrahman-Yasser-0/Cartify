import { z } from "zod";
import productValidationSchema from "./productValidation.ts";
import { count } from "console";

import { v4 as uuidv4 } from "uuid";

const userValidationSchema = z.object({
  // _id: z.union([z.string(), z.any()]).optional(),
  // __v: z.number().optional(),

  name: z.string(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().regex(/^\+?[0-9\s\-]{7,20}$/, "Invalid phone number"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be 8+ chars, contain uppercase, lowercase, number, and special char."
    ),
  hashPassword: z.string().optional(),
  role: z.enum(["user", "admin"]).default("user"),
  shpingAddress: z.object({
    country: z.string(),
    city: z.string(),
    streetAddress: z.string(),
    apartment: z.string().optional(),
    zip: z.string().regex(/^\d{3,10}$/, "Invalid postal code"),
  }),
  additionalInformation: z.object({ company: z.string(), notes: z.string() }),
  communicationPrefrences: z.object({ email: z.boolean(), sms: z.boolean() }),
  cart: z
    .array(
      z.object({
        productId: z.union([z.string(), z.any()]).optional(),
        quantity: z.number(),
      })
    )
    .optional(),
  purchased: z.array(z.any()),
  wishingList: z.array(z.string()).optional(),
});

export default userValidationSchema;
