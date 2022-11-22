const asyncHandler = require('express-async-handler')
const Recipe = require('../models/Recipe');
const User = require('../models/User');


// @desc    get recipes
// @route   GET /api/recipes 
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find()

    res.status(200).json(recipes)
})

// @desc    get users recipe
// @route   GET /api/recipes/user/:id
// @access  Public
const getUserRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({ user: req.params.id })

    if (!recipes) {
        res.status(400)
        throw new Error("User not found")
    }

    res.status(200).json(recipes)
})

// @desc    get recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
        res.status(400)
        throw new Error("Recipe not found")
    }

    res.status(200).json(recipe)
})

// @desc    create recipe
// @route   POST /api/recipes 
// @access  Private
const createRecipe = asyncHandler(async (req, res) => {
    const { title, ingredients, steps } = req.body;

    if (!title || !ingredients || !steps) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const recipe = await Recipe.create({
        title: title,
        ingredients: ingredients.split(",").map(ingedient => ingedient.trim()),
        steps: steps.split(",").map(step => step.trim()),
        likes: 0,
        user: req.user.id,
    })

    res.status(200).json(recipe)
})

// @desc    update (like) recipe
// @route   PUT /api/recipes/like/:id
// @access  Private
const likeRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        res.status(400)
        throw new Error("Recipe not found")
    }

    await Recipe.updateOne({ _id: req.params.id}, { $inc: { likes: 1 } })
    const liked = await Recipe.findOne({ _id: req.params.id })

    res.status(200).json(liked)
})

// @desc    update (unlike) recipe
// @route   PUT /api/recipes/unlike/:id
// @access  Private
const unlikeRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        res.status(400)
        throw new Error("Recipe not found")
    }

    const unliked = await Recipe.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } })

    res.status(200).json(unliked)
})

// @desc    delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        res.status(400)
        throw new Error("Recipe not found")
    }

    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // make sure logged in user matches the recipe user
    if (recipe.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await recipe.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getRecipes, 
    getUserRecipes,
    getRecipe,
    createRecipe, 
    likeRecipe, 
    unlikeRecipe, 
    deleteRecipe,
}