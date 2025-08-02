const { Sequelize } = require("sequelize");
const sqlite = require('sqlite3');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlite,
    host:"./api.db"
});

const connectDB = async () => {
    sequelize.sync();

    await sequelize.authenticate();
    console.log("Connected to DB");
};

module.exports = { sequelize, connectDB };