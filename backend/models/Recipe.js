const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add name of your recipe'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Please add the ingredients of your recipe'],
    },
    steps: {
      type: [String],
      required: [true, 'Please add the steps to making your recipe'],
    },
    likes: {
      type: Number,
      required: true,
    },
}, {
  timestamps: true
})

module.exports = mongoose.model('Recipe', RecipeSchema)