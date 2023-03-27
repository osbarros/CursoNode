import mongoose from "mongoose";

export default async function mongoConfig() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  mongoose.connection.on("error", () => {
    console.log("An error has occurred with the MongoDB connection");
    process.exit(1);
  });
}
