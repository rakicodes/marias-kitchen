const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUser } = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/:id', getUser)

module.exports = router;