import mongoose, { Schema } from "mongoose";

const Todo = new Schema({
    text: { type: String, required: true },
    complated: { type: Boolean, required: true },
    order: { type: Number, required: true }
});

export default mongoose.model('Todo', Todo);