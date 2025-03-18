import { MongoClient } from "mongodb";


let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {

  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI!);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  
  client = new MongoClient(process.env.MONGODB_URI!);
  clientPromise = client.connect();
}

export { clientPromise };
