"use server";

import { registerSchema } from "@/Schemas/";
import User from "@/models/userModels";
import * as z from "zod";
import bcrypt from "bcryptjs";
import ConnectToDb from "@/lib/db";
import clientPromise from "@/lib/db";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(data);

  if (!validateFields.success) return { error: "Invalid Fields" };

  const { email, password, subscribe } = validateFields.data;

  const client = await clientPromise;
  const db = client.db();
  const users = await db.collection("users");

  const user = await users.findOne({ email });
  if (user) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    subscribe,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await users.insertOne(newUser);

  return { success: "User created Successfully" };
};
