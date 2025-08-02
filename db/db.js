const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host:"./api.db"
});

const connectDB = async () => {
    sequelize.sync();

    await sequelize.authenticate();
    console.log("Connected to DB");
};

module.exports = { sequelize, connectDB };