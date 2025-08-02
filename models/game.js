const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize')

const Game = sequelize.define('games', {

    id_user:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING
    },
    game_name:{
        type:DataTypes.STRING, 
        allowNull:false, 
    }, 
    game_score:{
        type: DataTypes.NUMBER, 
        allowNull: false, 
    }
})

module.exports = Game;