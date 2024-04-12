import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // cloudinary upload
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const Note = mongoose.model("Note", noteSchema)