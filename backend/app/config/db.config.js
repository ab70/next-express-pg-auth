const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('testdb', 'postgres','1234',{
    host: process.env.PROD==='false' ? '172.19.0.1' : process.env.POSTGRES_DOCKER_NAME,
    dialect: 'postgres',
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
});

module.exports = sequelize;