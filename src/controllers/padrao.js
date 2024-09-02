const franquias = require('../model/franquias')
const generos = require('../model/generos')
const assentos = require('../model/assentos')
const classificacao = require('../model/classificacao')
const linguagens = require('../model/linguagens')
const pagamentos = require('../model/pagamentos')
const tipoCliente = require('../model/tipoCliente')
const tipoIngresso = require('../model/tipoIngresso')

module.exports = {
    async franquia(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async generos(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async assentos(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async classificacao(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async linguagens (req,  res) {
        res.render('../views/adm/indexadm');
    },
    async pagamentos(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async tipoCliente(req,  res) {
        res.render('../views/adm/indexadm');
    },
    async tipoCliente(req,  res) {
        res.render('../views/adm/indexadm');
    }
}