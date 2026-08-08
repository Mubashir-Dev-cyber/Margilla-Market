import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (mongoose.connection.readyState === 2) {
        await mongoose.connection.asPromise();
        return;
    }

    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!uri) {
        throw new Error("Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI in your environment.");
    }

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB");
};

export default connectDB;
