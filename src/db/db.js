import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_JS_DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the NEXT_JS_DATABASE_URL environment variable");
}

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};

export default dbConnect;
