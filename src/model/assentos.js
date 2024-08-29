const Sequelize = require('sequelize');
const database = require('../config/bd');

const assentos = database.define('Assentos', {
    IDAssentos: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Numero: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = assentos;