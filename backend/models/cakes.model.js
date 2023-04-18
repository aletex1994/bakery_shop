const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
 quantity: Number,
 udm: String,
 name: String,
});

const cakePastrySchema = new mongoose.Schema({
 date: {
  type: Date,
  default: Date.now,
 },
 name: {
  type: String,
  required: true,
 },
 price: {
  type: Number,
  required: true,
 },
 ingredients: [ingredientSchema],
 onSale: {
  type: Boolean,
  default: false,
 },
 quantity: {
  type: Number,
  default: 0,
 },
 images: [String],
});

const CakePastry = mongoose.model("CakePastry", cakePastrySchema);

module.exports = CakePastry;
