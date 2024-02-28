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
const sequelize = require('./app/config/db.config');

// Environment variables
require('dotenv').config({ path: './.env' });


const app = express();

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
sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
require('./app/routes/api')(app);


