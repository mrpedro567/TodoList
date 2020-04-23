const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   name: String, 
   category: String,
   status: Boolean,
   date: [String],
});

module.exports = mongoose.model('Todo', todoSchema);