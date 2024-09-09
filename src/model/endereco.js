const Sequelize = require('sequelize');
const database = require('../config/bd');
const cinema = require('./cinemaLocal');

const endereco = database.define('Endereco', {
    IDEndereco: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Logradouro: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Numero: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    CEP: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    Cidade: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

endereco.belongsTo(cinema, {
    constraint: true,
    foreignKey: 'IDCinema',
    onDelete:  'cascade'
});

module.exports = endereco;