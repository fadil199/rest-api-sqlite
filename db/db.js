const { Sequelize } = require("sequelize");
const { DatabaseSync } =  require('node:sqlite');

//const db = new DatabaseSync('db.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host:"./api.db"
});

const connectDB = async () => {
    sequelize.sync();

    //const db = new DatabaseSync('db.sqlite');

    await sequelize.authenticate();
    console.log("Connected to DB");
    //db.close();
};

module.exports = { sequelize, connectDB };