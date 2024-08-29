const Sequelize = require('sequelize');
const database = require('../config/bd');

const tipoIngresso = database.define('TipoIngresso', {
    IDTipoIngresso: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Tipo: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Porcentagem: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = tipoIngresso;