import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MongoClient } from "mongodb";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
});
