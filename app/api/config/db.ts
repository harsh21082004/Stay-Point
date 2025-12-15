import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.NEXT_PUBLIC_MONGO_URI;
        if (!mongoUri) {
            throw new Error("MongoDB connection URI is not defined");
        }
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
};
