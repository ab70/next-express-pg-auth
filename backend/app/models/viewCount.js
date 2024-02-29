const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ViewCount = sequelize.define('ViewCount', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Foreign key constraint
            model: 'User',
            key: 'id'
        },
        unique: true // Ensure each user has one unique profile view count
    },
    viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Start with 0 views
    }
});

module.exports = ViewCount;