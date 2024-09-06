const express = require('express');
const route = express.Router();

const multer = require("multer");

const config = require('./src/config/multer');
const home = require('./src/controllers/home');
const excluir = require('./src/controllers/excluir');
const editar = require('./src/controllers/editar');
const padrao = require('./src/controllers/padrao');
const cadastro = require('./src/controllers/cadastro');

route.get('/', home.pagInicialGet);
route.get('/index', home.pagInicialGet);

route.post('/', home.pagInicialPost);
route.post('/index', home.pagInicialPost);

route.get('/cliente', home.pagIndexCliGet);
route.post('/cliente', home.pagIndexCliPost);

route.get('/filmesAdm', home.pagfilmesadmGet);
route.post('/filmesAdm', home.pagfilmesadmPost);

route.post('/DeletarFilme/:id', multer(config).single('foto'), excluir.deletarFilme);

route.get('/cinemasAdm', home.pagcinemasadmGet);
route.post('/cinemasAdm', home.pagcinemasadmPost);

route.get('/sessoesAdm', home.pagsessaoadmGet);
route.post('/sessoesAdm', home.pagsessaoadmPost);

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
route.post('/registrarCinema', multer(config).single('foto'), cadastro.cinemaLocalInsert);

route.get('/login', cadastro.cliente);
route.post('/login', cadastro.clienteInsert);

route.post('/entrar', cadastro.VerificarEntrada);

route.get('/compra', cadastro.compra);
route.post('/compra', cadastro.compraInsert);

route.get('/endereco', cadastro.endereco);

route.get('/registrarFilme', cadastro.filme);
route.post('/registrarFilme', multer(config).single('foto'), cadastro.filmeInsert);

route.get('/ingresso', cadastro.ingresso);
route.post('/ingresso', cadastro.ingressoInsert);

route.get('/sala', cadastro.sala);

route.get('/newSessao', cadastro.sessao);
route.post('/newSessao', cadastro.sessaoInsert);

route.get('/perfilUsuario', home.pagPerfilGet);
route.post('/perfilUsuario', home.pagPerfilPost);

// ----- editar -------

route.get('/editarFilme/:id', editar.filmes);
route.post('/editarFilme/:id', multer(config).single('foto'), editar.adicionarFilme);

module.exports = route;