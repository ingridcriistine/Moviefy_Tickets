const Sequelize = require('sequelize');
const database = require('../config/bd');
const compra = require('./compra');
const tipo = require('./tipoIngresso');
const sessao = require('./sessao');
const assento = require('./assento');

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
    foreignKey: 'IDTipo',
    onDelete: 'cascade'
});

ingresso.belongsTo(assento, {
    constraint: true,
    foreignKey: 'IDAssento',
    onDelete: 'cascade'
})

ingresso.belongsTo(sessao, {
    constraint: true,
    foreignKey: 'IDSessao',
    onDelete: 'cascade'
})

ingresso.belongsTo(compra, {
    constraint: true,
    foreignKey: 'NumeroCompra',
    onDelete: 'cascade'
})

module.exports = ingresso;