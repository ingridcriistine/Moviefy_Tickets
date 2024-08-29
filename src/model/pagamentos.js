const Sequelize = require('sequelize');
const database = require('../config/bd');

const pagamento = database.define('Pagamento', {
    IDPagamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Tipo: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = pagamento;