const Sequelize = require('sequelize');
const database = require('../config/bd');
const tipo = require('./tipoCliente');

const cliente = database.define('Clientes', {
    IDCliente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    DataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    }, 
    CPF: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
})

cliente.belongsTo(tipo, {
        constraint: true,
        foreignKey: 'IDTipo'
    },
);

module.exports = cliente;