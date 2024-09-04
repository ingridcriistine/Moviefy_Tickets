const express = require('express');
const route = express.Router();

const multer = require("multer");

const config = require('./src/config/multer');
const home = require('./src/controllers/home');
const padrao = require('./src/controllers/padrao');
const cadastro = require('./src/controllers/cadastro');

route.get('/', home.pagInicialGet);
route.get('/index', home.pagInicialGet);

route.post('/', home.pagInicialPost);
route.post('/index', home.pagInicialPost);

route.get('/filmesAdm', home.pagfilmesadmGet);
route.post('/filmesAdm', home.pagfilmesadmPost);

route.get('/franquia', padrao.franquia);
route.get('/genero', padrao.genero);
route.get('/assento', padrao.assento);
route.get('/classificao', padrao.classificacao);
route.get('/linguagem', padrao.linguagem);
route.get('/pagamento', padrao.pagamento);
route.get('/tipoCliente', padrao.tipoCliente);
route.get('/tipoIngresso', padrao.tipoIngresso);

/*Cadastros*/
route.get('/registrarCinema', cadastro.cinemaLocal);
route.post('/registrarCinema', cadastro.cinemaLocalInsert);

route.get('/cliente', cadastro.cliente);
route.post('/cliente', multer(config).single('foto'), cadastro.clienteInsert);

route.get('/compra', cadastro.compra);
route.post('/compra', cadastro.compraInsert);

route.get('/endereco', cadastro.endereco);
route.post('/endereco', cadastro.enderecoInsert);

route.get('/registrarFilme', cadastro.filme);
route.post('/registrarFilme', cadastro.filmeInsert);

route.get('/ingresso', cadastro.ingresso);
route.post('/ingresso', cadastro.ingressoInsert);

route.get('/sala', cadastro.sala);
route.post('/sala', cadastro.salaInsert);

route.get('/newSessao', cadastro.sessao);
route.post('/newSessao', cadastro.sessaoInsert);

module.exports = route;