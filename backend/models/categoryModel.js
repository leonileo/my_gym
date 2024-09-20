// DATA SCHEMA
// categoryModel.js
// Import necessary modules
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true}
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;