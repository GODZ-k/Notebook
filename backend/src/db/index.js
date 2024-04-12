import mongoose from "mongoose";
const DB_CONNECTION = `${process.env.MONGO_URL}/NoteApp`

async function connectDB() {
    await mongoose.connect(DB_CONNECTION).then((connectionInstance) => {
        console.log(`database is connected !! DB HOST: ${connectionInstance.connection.host}`);
    }).catch((error) => {
        console.log("connection error: " + error)
        process.exit(1)
    })
}

export default connectDB