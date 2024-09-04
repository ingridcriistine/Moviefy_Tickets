const Sequelize = require('sequelize');
const database = require('../config/bd');
const cinema = require('./cinemaLocal');

const sala = database.define('Salas', {
    IDSala: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Numero: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
})
module.exports = sala;