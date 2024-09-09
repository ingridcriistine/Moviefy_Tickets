const filme = require('../model/filme');
const classificacao = require('../model/classificacao');
const cinemaLocal = require('../model/cinemaLocal');
const endereco = require('../model/endereco');
const sala = require('../model/sala');
const cliente = require('../model/cliente');
const sessao = require('../model/sessao');
const generos = require('../model/genero');
const { where,Op } = require('sequelize');

const fs = require("fs");
const { param } = require('../../routes');
const { get } = require('http');

module.exports = {
    
    async pagInicialGet(req, res){
        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            }
        });

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['Logradouro', 'CinemaLocal.Nome', 'CinemaLocal.Foto', 'IDCinema'],
            include: [{model: cinemaLocal}]
        });

        res.render('../views/adm/indexadm', {filmes, enderecos});
    },
    
    async pagInicialPost(req, res){
        res.render('../views/adm/indexadm');
    },
    
    async pagLoginGet(req, res){
        res.render('../views/login');
    },
    
    async pagLoginPost(req, res){
        res.render('../views/login');
    },

    async pagIndexAnonimoGet(req, res) {

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ]
        });

        res.render('../views/indexAnonimo', {filmes});
    },

    async pagIndexAnonimoPost(req, res) {
        res.render('../views/indexAnonimo');
    },

    // -------------------------------- ADM ----------------------------------

    async pagfilmesadmGet(req, res){
        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            }
        })

        res.render('../views/adm/filmesadm', {filmes});
    },
    
    async pagfilmesadmPost(req, res){  

        res.render('../views/adm/filmesadm');
    },

    async pagcinemasadmGet(req, res){

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['Logradouro', 'CinemaLocal.Nome', 'CinemaLocal.Foto', 'IDCinema'],
            include: [{model: cinemaLocal}]
        });

        res.render('../views/adm/cinemasadm', {enderecos});
    },
    
    async pagcinemasadmPost(req, res){
        res.render('../views/adm/cinemasadm');
    },
    
    async pagsessaoadmGet(req, res){

        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao', 'Dublado', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDSala', 'Filme.Titulo', 'Filme.Foto', 'Sala.Numero', 'CinemaLocal.Nome'],
            include:[
                {model: filme},
                {model: sala},
                {model: cinemaLocal}
            ]
        });

        console.log(sessoes);

        res.render('../views/adm/sessoes', {sessoes});
    },

    async pagsessaoadmPost(req, res){
        res.render('../views/adm/sessoes');
    },


    // -------------------------------- CLIENTE ----------------------------------
    
    async pagIndexCliGet(req, res){
        
        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ]
        });

        res.render('../views/index', {filmes});
    },
    
    async pagIndexCliPost(req, res){
        res.render('../views/index');
    },
    
    async pagPerfilUsuarioGet(req, res){
        const clientes = await cliente.findOne({
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha', 'Foto', 'IDTipo']
        });

        res.render('../views/perfilUsuario', {clientes});
    },
    
    async pagPerfilUsuarioPost(req, res){
        res.render('../views/perfilUsuario');
    },

    async pagFilmesBreveGet(req, res) {

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            }
        })

        res.render('../views/filmesBreve', {filmes});
    },

    async pagFilmesBrevePost(req, res) {

        const dados = req.body.pesquisa;
        console.log(dados);

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            },
            where: {Titulo:{[Op.like]:`%${dados}%`}}
        })

        res.render('../views/filmesBreve', {filmes});
    },

    async pagFilmesCartazGet(req, res) {

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            }
        })

        res.render('../views/filmesCartaz', {filmes});
    },

    async pagFilmesCartazPost(req, res) {
        const dados = req.body.pesquisa;
        console.log(dados);

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            },
            where: {Titulo:{[Op.like]:`%${dados}%`}}
        })

        res.render('../views/filmesCartaz', {filmes});
    },

    async pagCinemasGet(req, res) {

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['IDEndereco', 'Logradouro', 'Numero', 'CEP', 'Cidade']
        });


        res.render('../views/cinemas', {cinemas, enderecos});
    },

    async pagCinemasPost(req, res) {
        res.render('../views/cinemas');
    },

    async pagDetalhesFilmeGet(req, res) {

        const id = req.params.id;

        const filmes = await filme.findOne({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Foto', 'Duracao', 'ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ],
            where: {IDFilme : id}}
        );
        
        res.render('../views/detalhesFilme', {filmes});
    },

    async pagDetalhesFilmePost(req, res) {
        res.render('../views/detalhesFilme');
    },

    async pagDetalhesCinemaGet(req, res) {
        res.render('../views/detalhesCinema');
    },

    async pagDetalhesCinemaPost(req, res) {
        res.render('../views/detalhesCinema');
    },

    async pagComprarIngressoGet(req, res) {
        res.render('../views/comprarIngresso');
    },

    async pagComprarIngressoPost(req, res) {
        res.render('../views/comprarIngresso');
    },

    async pagComprarIngressoGet(req, res) {
        res.render('../views/comprarIngresso');
    },

    async pagPagamentoGet(req, res) {
        res.render('../views/pagamento');
    },

    async pagPagamentoPost(req, res) {
        res.render('../views/pagamento');
    }
 
}