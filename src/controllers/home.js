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

    async pagLoginGet(req, res){
        res.render('../views/login');
    },
    
    async pagLoginPost(req, res){
        res.render('../views/login');
    },

    async pagIndexCliGet(req, res){
        res.render('../views/index');
    },
    
    async pagIndexCliPost(req, res){
        res.render('../views/index');
    },

    async pagIndexCliGet(req, res){
        res.render('../views/index');
    },
    
    async pagIndexCliPost(req, res){
        res.render('../views/index');
    },

    async pagPerfilGet(req, res){
        const clientes = await cliente.findOne({
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha', 'Foto', 'IDTipo']
        });

        res.render('../views/perfilUsuario', {clientes});
    },
    
    async pagPerfilPost(req, res){
        res.render('../views/perfilUsuario');
    },

    // -------------------------------- CLIENTE ----------------------------------


}