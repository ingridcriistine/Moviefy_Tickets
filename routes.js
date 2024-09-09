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

route.get('/indexAnonimo', home.pagIndexAnonimoGet);
route.post('/indexAnonimo', home.pagIndexAnonimoPost);


// -------------------------------- CLIENTE ----------------------------------
route.get('/cliente', home.pagIndexCliGet);
route.post('/cliente', home.pagIndexCliPost);

route.get('/filmesBreve', home.pagFilmesBreveGet);
route.post('/filmesBreve', home.pagFilmesBrevePost);

route.get('/filmesCartaz', home.pagFilmesCartazGet);
route.post('/filmesCartaz', home.pagFilmesCartazPost);

route.get('/cinemas', home.pagCinemasGet);
route.post('/cinemas', home.pagCinemasPost);

route.get('/perfilUsuario', home.pagPerfilUsuarioGet);
route.post('/perfilUsuario', home.pagPerfilUsuarioPost);

route.get('/detalhesFilme/:id', home.pagDetalhesFilmeGet);
route.post('/detalhesFilme/:id', home.pagDetalhesFilmePost);

route.get('/detalhesCinema/: id', home.pagDetalhesCinemaGet);
route.post('/detalhesCinema/: id', home.pagDetalhesCinemaPost);

route.get('/comprarIngresso', home.pagComprarIngressoGet);
route.post('/comprarIngresso', home.pagComprarIngressoPost);

route.get('/pagamento', home.pagPagamentoGet);
route.post('/pagamento', home.pagPagamentoPost);


// ---------------------------------- ADM ------------------------------------
route.get('/filmesAdm', home.pagfilmesadmGet);
route.post('/filmesAdm', home.pagfilmesadmPost);

route.post('/DeletarFilme/:id', multer(config).single('foto'), excluir.deletarFilme);
route.post('/DeletarCinema/:id', multer(config).single('foto'), excluir.deletarCinema);

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


// ------------------------------ CADASTROS --------------------------------
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


// -------------------------------- EDITAR ----------------------------------
route.get('/editarFilme/:id', editar.filmes);
route.post('/editarFilme/:id', multer(config).single('foto'), editar.adicionarFilme);

route.get('/editarCinema/:id', editar.cinemas);
route.post('/editarCinema/:id', multer(config).single('foto'), editar.adicionarCinema);

module.exports = route;