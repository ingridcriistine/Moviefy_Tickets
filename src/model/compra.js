const Sequelize = require('sequelize');
const database = require('../config/bd');
const pagamento = require('./pagamento');
const cliente = require('./cliente');

const compra = database.define('Compras', {
    IDCompra: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

compra.belongsTo(pagamento,{
    constraint: true,
    foreignKey: 'IDPagamento',
    onDelete: 'cascade'
});

compra.belongsTo(cliente, {
    constraint: true,
    foreignKey: 'IDCliente',
    onDelete: 'cascade'
});

module.exports = compra;