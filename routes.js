const express = require('express');
const route = express.Router();

const multer = require("multer");

const config = require('./src/config/multer');
const home = require('./src/controllers/home');
const padrao = require('./src/controllers/padrao');

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

module.exports = route;