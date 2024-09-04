const sequelize = require('sequelize');

const database = new sequelize('MoviefyTicket', 'Moviefy', 'etsps2024401',
{
    dialect: 'mssql', host:'localhost', port: 63650
    // dialect: 'mssql', host:'localhost', port: 57136
    // dialect: 'mssql', host:'localhost', port: 1433
});

database.sync();

module.exports = database;