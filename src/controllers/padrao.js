const franquia = require('../model/franquia')
const genero = require('../model/genero')
const assento = require('../model/assento')
const classificacao = require('../model/classificacao')
const linguagen = require('../model/linguagen')
const pagamento = require('../model/pagamento')
const tipoCliente = require('../model/tipoCliente')
const tipoIngresso = require('../model/tipoIngresso')

module.exports = {
    async franquia(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async genero(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async assento(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async classificacao(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async linguagen(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async pagamento(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async tipoCliente(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async tipoCliente(req,  res) {
        res.render('../views/adm/indexadm');
    }
}