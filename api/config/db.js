import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.djyudka.mongodb.net/Tinder?retryWrites=true&w=majority&appName=Cluster0`;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}
