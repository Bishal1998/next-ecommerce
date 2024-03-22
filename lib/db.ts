// import mongoose from "mongoose";

// const ConnectToDb = async () => {
//   try {
//     await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL as string);
//     console.log("Successfully connected to database");
//   } catch (error: any) {
//     throw new Error(`Error connecting to database: ${error}`);
//   }
// };
// export default ConnectToDb;

import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_DB_URL"');
}

const uri = process.env.NEXT_PUBLIC_DB_URL;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;
