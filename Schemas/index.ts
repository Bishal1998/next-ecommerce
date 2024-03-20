import * as z from "zod";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?`~()\-_+=\[{\]};:'",.<>\\|]).{8,}$/,
      {
        message:
          "Password must contain at least one uppercase, one lowercase, one number and one special characters",
      }
    ),
  terms: z.boolean(),
  subscribe: z.boolean(),
});

export { registerSchema };
