"use server";

import { loginSchema } from "@/Schemas";
import User from "@/models/userModels";
import * as z from "zod";
import bcrypt from "bcryptjs";
import ConnectToDb from "@/lib/db";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(data);

  if (!validateFields.success) return { error: "Invalid Fields" };

  const { email, password } = validateFields.data;
  await ConnectToDb();

  const user = await User.findOne({ email });
  if (!user) {
    return { error: "User doesnot exists" };
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) return { error: "Password didnot match" };

  return { success: "Logged in Successfully" };
};
