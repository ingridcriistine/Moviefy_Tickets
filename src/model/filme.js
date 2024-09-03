const Sequelize = require('sequelize');
const database = require('../config/bd');
const genero = require('./genero');
const classificacao = require('./classificacao');

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
        type: Sequelize.DATEONLY,
        allowNull: false
    }, 
    DataSaida: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Duracao: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(50),
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