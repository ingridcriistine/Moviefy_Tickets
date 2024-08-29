const Sequelize = require('sequelize');
const database = require('../config/bd');
const pagamento = require('./pagamentos');
const cliente = require('./clientes');

const compra = database.define('Compras', {
    IDCompra: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

compra.belongsTo(
    pagamento, {
        constraint: true,
        foreignKey: 'IDPagamento',
        allowNull: true
    },
    cliente, {
        constraint: true,
        foreignKey: 'IDCliente'
    }
)