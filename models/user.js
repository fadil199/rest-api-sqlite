const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {

    username:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING
    },
    role: {
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING, 
    }
})

module.exports = User;