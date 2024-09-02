const Sequelize = require('sequelize');
const database = require('../config/bd');
const filme = require('./filme');
const cinema = require('./cinemaLocal');
const linguagem = require('./linguagens');
const sala = require('./salas');

const sessao = database.define('Sessao', {
    IDSessao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    TresD: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Ativa: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Hora: {
        type: Sequelize.TIME,
        allowNull: false
    }
})

sessao.belongsTo(filme, {
        constraint: true,
        foreignKey: 'IDFilme'
    },
    cinema, {
        constraint: true,
        foreignKey: 'IDCinema'
    },
    linguagem, {
        constraint: true,
        foreignKey: 'IDLinguagem'
    },
    sala, {
        constraint: true,
        foreignKey: 'IDSala'
    }
);

module.exports = sessao;