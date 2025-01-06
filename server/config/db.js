import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = process.env.URI;
        
        await mongoose.connect(url);
        console.log("Databse is connecting")
    } catch (err) {
        console.error(err.message);
        
        process.exit(1);
    }
}
