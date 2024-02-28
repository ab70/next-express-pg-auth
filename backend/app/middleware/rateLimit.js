const rateLimit = require('express-rate-limit');

// Configure rate limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 50 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

module.exports = { limiter };
