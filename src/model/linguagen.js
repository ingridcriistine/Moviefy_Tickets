const Sequelize = require('sequelize');
const database = require('../config/bd');

const linguagem = database.define('Linguagem', {
    IDLinguagem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Linguagem: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = linguagem;