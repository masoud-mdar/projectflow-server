import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.DB_URI as string, {});
        console.log("successfully connected to the database !")
    } catch (error) {
        console.error("error while connecting to the database");
        process.exit(1);
    }
}

export default connectDB;