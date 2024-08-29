const Sequelize = require('sequelize');
const database = require('../config/bd');

const tipoCliente = database.define('TipoCliente', {
    IDTipoCliente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Tipo: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = tipoCliente;