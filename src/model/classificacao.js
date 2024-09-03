const Sequelize = require('sequelize');
const database = require('../config/bd');

const classificacao = database.define('ClassificacoesIndicativa', {
    IDClassificacao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Idade: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
});

module.exports = classificacao;