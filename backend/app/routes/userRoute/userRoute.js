const express = require('express');
const { checkUser } = require('../../middleware/authMiddleware.');
const userController = require('../../controllers/user/userController');

const router = express.Router();

// user info
router.get('/user', checkUser, userController().getUserInfo);

// Visit profile
router.get('/user/:id', checkUser, userController().visitProfile);

module.exports = router;