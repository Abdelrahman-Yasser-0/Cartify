import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";
import { de } from "zod/v4/locales";

extendZod(z);
const productValidationSchema = z.object({
  // _id: z.union([z.string(), z.any()]).optional(),
  // __v: z.number().optional(),
  // id: z.string().unique(),
  title: z.string(),
  brand: z.string(),
  rate: z.union([z.string(), z.any()]),
  price: z.number(),

  imgurl: z.string(),
  quatity: z.number(),
  inStock: z.boolean(),
  category: z.string(),
  originalPrice: z.number().optional(),
  discount: z.number().optional(),
  sku: z.string().optional(),
  colors: z.array(z.string()).optional(),
  description: z.string().optional(),
  specifications: z.record(z.string()).optional(),

  reviews: z
    .array(
      z.object({
        author: z.string().optional(),
        rating: z.number().optional(),
        comment: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),
  shortDescription: z.string().optional(),
});

export default productValidationSchema;
