const filme = require('../model/filme');
const classificacao = require('../model/classificacao');
const cinemaLocal = require('../model/cinemaLocal');
const endereco = require('../model/endereco');
const sala = require('../model/sala');
const cliente = require('../model/cliente');
const sessao = require('../model/sessao');
const generos = require('../model/genero');
const franquia = require('../model/franquia');
const { where,Op } = require('sequelize');

const fs = require("fs");
const { param } = require('../../routes');
const { get } = require('http');
const { now } = require('sequelize/lib/utils');

module.exports = {
    
    async pagInicialGet(req, res){

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

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
        
        console.log(cliente)

        res.render('../views/adm/indexadm', {filmes, enderecos, user});
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

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        res.render('../views/adm/filmesadm', {filmes, user});
    },
    
    async pagfilmesadmPost(req, res){  

        res.render('../views/adm/filmesadm');
    },

    async pagcinemasadmGet(req, res){

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['Logradouro', 'CinemaLocal.Nome', 'CinemaLocal.Foto', 'IDCinema'],
            include: [{model: cinemaLocal}]
        });

        res.render('../views/adm/cinemasadm', {enderecos, user});
    },
    
    async pagcinemasadmPost(req, res){
        res.render('../views/adm/cinemasadm');
    },
    
    async pagsessaoadmGet(req, res){

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

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

        res.render('../views/adm/sessoes', {sessoes, user});
    },

    async pagsessaoadmPost(req, res){
        res.render('../views/adm/sessoes');
    },


    // -------------------------------- CLIENTE ----------------------------------
    
    async pagIndexCliGet(req, res){

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ]
        });

        const franquias = await franquia.findAll({
            raw: true,
            attributes: ['IDFranquia', 'Nome']
        });

        res.render('../views/index', {filmes, user, franquias});
    },
    
    async pagIndexCliPost(req, res){
        res.render('../views/index');
    },
    
    async pagPerfilUsuarioGet(req, res){
        
        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const clientes = await cliente.findOne({
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha', 'Foto', 'IDTipo']
        });

        res.render('../views/perfilUsuario', {clientes, user});
    },
    
    async pagPerfilUsuarioPost(req, res){
        res.render('../views/perfilUsuario');
    },

    async pagFilmesBreveGet(req, res) {

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            }
        })

        res.render('../views/filmesBreve', {filmes, user});
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
        
        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto','ClassificacoesIndicativa.Idade'],
            include:{
                model: classificacao
            }
        })

        res.render('../views/filmesCartaz', {filmes, user});
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

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['IDEndereco', 'Logradouro', 'Numero', 'CEP', 'Cidade']
        });


        res.render('../views/cinemas', {cinemas, enderecos, user});
    },

    async pagCinemasPost(req, res) {
        res.render('../views/cinemas');
    },

    async pagDetalhesFilmeGet(req, res) {

        const id = req.params.id;
        
        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        let dias = [];
        let dia = now();
        for (let index = 0; index < 4; index++) {
            dia.setDate(dia.getDate()+1)
            dias.push(dia.toLocaleDateString())
        }
        console.log(dias);
  

        const filmes = await filme.findOne({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Foto', 'Duracao', 'ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ],
            where: {IDFilme : id}}
        );
        
        res.render('../views/detalhesFilme', {filmes, user,dias});
    },

    async pagDetalhesSessaoFilmeGet(req,res){
        let id_filme = req.params.id;
        let dia = req.params.dia;
        let id_cliente = req.session.IDCliente;

        const user = await cliente.findOne({
            where: { IDCliente: id_cliente },
            raw: true
        });

        const filmes = await filme.findOne({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Foto', 'Duracao', 'ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ],
            where: {IDFilme : id_filme}}
        );

        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDSala'],
            where: {IDFilme : id_filme,Data:`%${dia}%`}
        })
        console.log(sessoes);

        let dias = [];
        let dia1 = now();
        for (let index = 0; index < 4; index++) {
            dia1.setDate(dia1.getDate()+1)
            dias.push(dia1.toLocaleDateString())
        }

        res.render('../views/detalhesFilme', {filmes, user, sessoes,dias});
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