const Sequelize = require('sequelize');
const database = require('../config/bd');
const franquia = require('./franquia');

const cinemaLocal = database.define('CinemaLocal', {
    IDCinemaLocal: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

cinemaLocal.belongsTo(franquia, {
    constraint: true,
    foreignKey: 'IDFranquia'
});

module.exports = cinemaLocal;