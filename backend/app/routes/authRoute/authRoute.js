const express = require('express');
const authControllers = require('../../controllers/auth/authControllers');
const { limiter } = require('../../middleware/rateLimit');
const { signUpValidator } = require('../../middleware/validations/validate');
const router = express.Router();

// User signup
router.post('/signup', limiter, signUpValidator, authControllers().signUp);
// Login
router.post('/signin', authControllers().signIn);

module.exports = router;