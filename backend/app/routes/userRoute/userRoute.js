const express = require('express');
const { checkUser } = require('../../middleware/authMiddleware.');
const userController = require('../../controllers/user/userController');
const { limiter } = require('../../middleware/rateLimit');

const router = express.Router();

// user info
router.get('/user', checkUser, userController().getUserInfo);
// All user with view count
router.get('/all', checkUser, userController().getAllUserWithViewCount);

// Visit profile
router.get('/user/:id', checkUser, userController().visitProfile);

//GEt all user
router.get('/users', limiter, userController().getAllUsers);

module.exports = router;