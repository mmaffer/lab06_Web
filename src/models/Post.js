import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, minLength: 5, maxLength: 30, required: true },
    content: { type: String, minLength: 10, required: true },
    hashtags: [String],
    imageUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

export default mongoose.model("Post", postSchema);