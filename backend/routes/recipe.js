const express = require('express'); // CommonJS syntax
const router = express.Router();
const { getRecipes, getUserRecipes, getRecipe, createRecipe, likeRecipe, unlikeRecipe, deleteRecipe } = require('../controllers/recipe')
const { protect } = require('../middleware/auth')

router.get('/', getRecipes)
router.get('/user/:id', getUserRecipes)
router.get('/:id', getRecipe)
router.post('/', protect, createRecipe )
router.put('/like/:id', likeRecipe)
router.put('/unlike/:id', unlikeRecipe)
router.delete('/:id', protect, deleteRecipe)

module.exports = router;