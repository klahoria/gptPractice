import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env)
        if (!process.env.MONGO_URI) { console.log("Database URI not found"), process.exit(); }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;