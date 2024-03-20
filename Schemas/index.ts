import * as z from "zod";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
      {
        message:
          "Password must contain at least one uppercase, one lowercase, one number and one special characters",
      }
    ),
});

export { registerSchema };
