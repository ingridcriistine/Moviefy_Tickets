const Sequelize = require('sequelize');
const database = require('../config/bd');
const tipo = require('./tipoIngresso');
const sessao = require('./Sessao');
const assento = require('./assentos');

const ingresso = database.define('Ingresso', {
    IDIngresso: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    NumeroCompra: {
        type: Sequelize.STRING(10),
        allowNull: false
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
    }
);

module.exports = ingresso;