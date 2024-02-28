const { body } = require('express-validator');

const signUpValidator = [
    body('userName', 'Username should not be empty').trim().notEmpty(),
    body('email', 'Invalid email').trim().isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 5 }),
];

module.exports = { signUpValidator };