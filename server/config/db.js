import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.djyudka.mongodb.net/Tinder?retryWrites=true&w=majority&appName=Cluster0`;
        
        await mongoose.connect(url);
        console.log("Databse is connecting")
    } catch (err) {
        console.error(err.message);
        
        process.exit(1);
    }
}
