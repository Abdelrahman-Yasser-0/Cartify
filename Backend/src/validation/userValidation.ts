import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be 8+ chars, contain uppercase, lowercase, number, and special char."
    ),
  role: z.enum(["user", "admin"]).default("user"),
});

export default userValidationSchema;
