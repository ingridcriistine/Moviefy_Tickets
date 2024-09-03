const Sequelize = require('sequelize');
const database = require('../config/bd');
const tipo = require('./tipoIngresso');
const sessao = require('./sessao');
const assento = require('./assento');
const compra = require('./compra');

const ingresso = database.define('Ingresso', {
    IDIngresso: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

ingresso.belongsTo(tipo, {
        constraint: true,
        foreignKey: 'IDTipo'
    },
    assento, {
        constraint: true,
        foreignKey: 'IDAssento'
    },
    sessao, {
        constraint: true,
        foreignKey: 'IDSessao'
    },
    compra, {
        constraint: true,
        foreignKey: 'NumeroCompra'
    }
);

module.exports = ingresso;