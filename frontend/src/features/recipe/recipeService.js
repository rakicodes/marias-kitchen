import axios from 'axios';

const API_URL = 'https://marias-kitchen.onrender.com/api/recipes/'


// Create new recipe
const createRecipe = async (recipeData, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.post(API_URL, recipeData, config)

    return response.data
}

// Like recipe
const likeRecipe = async (recipeId) => {
    const response = await axios.put(API_URL + 'like/' + recipeId)
    return response.data
}

// Delete recipe
const deleteRecipe = async (recipeId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.delete(API_URL + recipeId, config)

    return response.data
}

// Get recipe
const getRecipe = async (recipeId) => {
    const response = await axios.get(API_URL + recipeId)

    return response.data
}

// Get all recipes
const getRecipes = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

// Get user recipes
const getUserRecipes = async (userId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.get(API_URL + 'user/'  + userId, config)
    return response.data
}

const recipeService = {
    createRecipe,
    getRecipe,
    getRecipes,
    getUserRecipes,
    likeRecipe,
    deleteRecipe,
}

export default recipeService