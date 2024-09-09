const Sequelize = require('sequelize');
const database = require('../config/bd');
const filme = require('./filme');
const cinema = require('./cinemaLocal');
const sala = require('./sala');

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
    Dublado: {
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
    foreignKey: 'IDFilme',
    onDelete:  'cascade'
});

sessao.belongsTo(cinema, {
    constraint: true,
    foreignKey: 'IDCinema',
    onDelete:  'cascade'
});

sessao.belongsTo(sala, {
    constraint: true,
    foreignKey: 'IDSala',
    onDelete:  'cascade'
});

module.exports = sessao;