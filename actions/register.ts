"use server";

import { registerSchema } from "@/Schemas/";
import User from "@/models/userModels";
import * as z from "zod";
import bcrypt from "bcryptjs";
import ConnectToDb from "@/lib/db";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(data);

  if (!validateFields.success) return { error: "Invalid Fields" };

  const { email, password } = validateFields.data;

  await ConnectToDb();

  const user = await User.findOne({ email });
  if (user) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return { success: "User created Successfully" };
};
