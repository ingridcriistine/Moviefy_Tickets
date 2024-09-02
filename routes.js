const express = require('express');
const route = express.Router();

const multer = require("multer");

const config = require('./src/config/multer');
const home = require('./src/controllers/home');
const padrao = require('./src/controllers/padrao');
const padrao = require('./src/controllers/cadastro');

route.get('/', home.pagInicialGet);
route.get('/index', home.pagInicialGet);

route.post('/', home.pagInicialPost);
route.post('/index', home.pagInicialPost);

route.get('/franquia', padrao.franquia);
route.get('/genero', padrao.genero);
route.get('/assento', padrao.assento);
route.get('/classificao', padrao.classificacao);
route.get('/linguagem', padrao.linguagem);
route.get('/pagamento', padrao.pagamento);
route.get('/tipoCliente', padrao.tipoCliente);
route.get('/tipoIngresso', padrao.tipoIngresso);

/*Cadastros*/
route.get('/cinemaLocal', cadastro.cinemaLocal);
route.post('/cinemaLocal', multer(config).single('foto'), cadastro.cinemaLocalInsert);

route.get('/cliente', cadastro.cliente);
route.post('/cliente', multer(config).single('foto'), cadastro.clienteInsert);

route.get('/compra', cadastro.compra);
route.post('/compra', cadastro.compraInsert);

route.get('/endereco', cadastro.endereco);
route.post('/endereco', cadastro.enderecoInsert);

route.get('/filme', cadastro.filme);
route.post('/filme', multer(config).single('foto'), cadastro.filmeInsert);

route.get('/ingresso', cadastro.ingresso);
route.post('/ingresso', cadastro.ingressoInsert);

route.get('/sala', cadastro.sala);
route.post('/sala', cadastro.salaInsert);

route.get('/sessao', cadastro.sessao);
route.post('/sessao', cadastro.sessaoInsert);

module.exports = route;