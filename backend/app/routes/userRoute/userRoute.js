const express = require('express');
const { checkUser } = require('../../middleware/authMiddleware.');
const userController = require('../../controllers/user/userController');

const router = express.Router();

// user info
router.get('/user', checkUser, userController().getUserInfo);

module.exports = router;