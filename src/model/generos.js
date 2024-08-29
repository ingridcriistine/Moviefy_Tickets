const Sequelize = require('sequelize');
const database = require('../config/bd');

const genero = database.define('Genero', {
    IDGenero: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = genero;