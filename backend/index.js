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
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
// security
app.use(cors({
    credentials: true,
    origin: [
        'http://192.168.0.106:3000',
        // "https://accounts.google.com",
        // "https://login.microsoftonline.com",
        'https://niam-next.vercel.app',
        'http://localhost',
        'http://192.168.0.107:3000',
        'http://localhost:3000',

    ],
    //exposedHeaders:['set-cookie'],
}));
app.use(helmet());
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            secure: false, // required for cookies to work on HTTPS
            httpOnly: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 1
        }

    })
);



// parsing
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// compressiion
app.use(compression({
    level: 6
}));
require('./app/models/modelRelations');
// For dev using sync as it will migrate and change db accoring to schema, in PROD must use migration using cli
sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
require('./app/routes/api')(app);


