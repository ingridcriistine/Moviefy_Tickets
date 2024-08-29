const Sequelize = require('sequelize');
const database = require('../config/bd');
const genero = require('./generos');
const classificacao = require('../model/classificacao');

const filme = database.define('Filmes', {
    IDFilme: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    DataEstreia: {
        type: Sequelize.DATE,
        allowNull: false
    }, 
    DataSaida: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Duracao: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
})

filme.belongsTo(genero, {
        constraint: true,
        foreignKey: 'IDGenero'
    },
    classificacao, {
        constraint: true,
        foreignKey: 'IDClassificacao'
    }
);

module.exports = filme;