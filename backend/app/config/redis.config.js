const redis = require('redis');

//Serverless redis client, if self hosted then have to setup using docker 
const redisClient = redis.createClient({
    url: process.env.UPSTASH_REDIS_REST_URL,
    host: 'cache',
    port: 6379,
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
    // host: process.env.REDIS_HOST,
    // port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD
});


// Handle Redis client connection events
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});
module.exports = redisClient;