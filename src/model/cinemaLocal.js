const Sequelize = require('sequelize');
const database = require('../config/bd');
const franquia = require('./franquias');

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
    }
});

cinemaLocal.belongsTo(franquia, {
    constraint: true,
    foreignKey: 'IDFranquia'
});

module.exports = cinemaLocal;