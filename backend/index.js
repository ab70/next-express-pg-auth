// Core Express modules
const express = require('express');
// const path = require('path');
// Middleware for request handling and security
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

const helmet = require('helmet');
const cors = require('cors'); // Placed after security middleware

// Session management
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const sequelize = require('./app/config/db.config');
const redisClient = require('./app/config/redis.config');
redisClient.connect();
// Environment variables
require('dotenv').config({ path: './.env' });


const app = express();
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.PROD === 'false' ? false : true, // required for cookies to work on HTTPS
            httpOnly: false,
            sameSite: process.env.PROD === 'false' ? 'lax' : 'none',
            maxAge: 1000 * 60 * 60 * 1
        } 
    
    })
);
// security
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000',
    ],
    //exposedHeaders:['set-cookie'],
}));
app.use(helmet());
// parsing
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// compressiion
app.use(compression({
    level: 6
}));

// For dev using sync as it will migrate and change db accoring to schema, in PROD must use migration using cli
sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
require('./app/routes/api')(app);


