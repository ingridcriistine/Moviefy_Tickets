const filme = require('../model/filme');
const classificacao = require('../model/classificacao');
const cinemaLocal = require('../model/cinemaLocal');
const endereco = require('../model/endereco');
const sala = require('../model/sala');
const cliente = require('../model/cliente');
const sessao = require('../model/sessao');
const { where } = require('sequelize');

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

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        res.render('../views/adm/indexadm', {filmes, cinemas});
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
        res.render('../views/indexAnonimo');
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

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['IDEndereco', 'Logradouro', 'Numero', 'CEP', 'Cidade']
        });


        res.render('../views/adm/cinemasadm', {cinemas, enderecos});
    },
    
    async pagcinemasadmPost(req, res){
        res.render('../views/adm/cinemasadm');
    },
    
    async pagsessaoadmGet(req, res){
        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });
        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['IDEndereco', 'Logradouro', 'Numero', 'CEP', 'Cidade']
        });

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Numero']
        });
 
        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDLinguagem', 'IDSala']
        })

        res.render('../views/adm/sessoes', {cinemas, enderecos, salas});
    },

    async pagsessaoadmPost(req, res){
        res.render('../views/adm/sessoes');
    },


    // -------------------------------- CLIENTE ----------------------------------
    
    async pagIndexCliGet(req, res){
        res.render('../views/index');
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
        res.render('../views/filmesBreve');
    },

    async pagFilmesBrevePost(req, res) {
        res.render('../views/filmesBreve');
    },

    async pagFilmesCartazGet(req, res) {
        res.render('../views/filmesCartaz');
    },

    async pagFilmesCartazPost(req, res) {
        res.render('../views/filmesCartaz');
    },

    async pagCinemasGet(req, res) {
        res.render('../views/cinemas');
    },

    async pagCinemasPost(req, res) {
        res.render('../views/cinemas');
    },

    async pagDetalhesFilmeGet(req, res) {
        res.render('../views/detalhesFilme');
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