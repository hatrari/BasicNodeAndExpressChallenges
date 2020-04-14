const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Person = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: []
});