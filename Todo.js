const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    text: { type: String, required: true },
    complated: { type: Boolean, required: true },
    order: { type: Number, required: true }
});

module.exports = mongoose.model('Todo', Todo);