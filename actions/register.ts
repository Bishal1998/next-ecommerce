"use server";

import { registerSchema } from "@/Schema";
import * as z from "zod";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(data);

  if (!validateFields.success) return { error: "Invalid Fields" };

  return { success: "Email Sent" };
};
