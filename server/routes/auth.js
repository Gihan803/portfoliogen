const express = require('express');
const { register, login, logout, getCurrentUser, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);

module.exports = router;
