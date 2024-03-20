import mongoose from "mongoose";

const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL as string);
    console.log("Successfully connected to database");
  } catch (error: any) {
    throw new Error(`Error connecting to database: ${error}`);
  }
};
export default ConnectToDb;
