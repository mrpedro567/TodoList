const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   name: String, 
   category: String,
   status: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema);