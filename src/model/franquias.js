const Sequelize = require('sequelize');
const database = require('../config/bd');

const franquia = database.define('Franquia', {
    IDFranquia: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = franquia;