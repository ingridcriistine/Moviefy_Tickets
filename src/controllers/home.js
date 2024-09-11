const filme = require('../model/filme');
const classificacao = require('../model/classificacao');
const cinemaLocal = require('../model/cinemaLocal');
const endereco = require('../model/endereco');
const sala = require('../model/sala');
const cliente = require('../model/cliente');
const sessao = require('../model/sessao');
const generos = require('../model/genero');
const franquia = require('../model/franquia');
const pagamento = require('../model/pagamento');
const assento = require('../model/assento');
const tipoIngresso = require('../model/tipoIngresso');
const { where,Op } = require('sequelize');
const sequelize = require('sequelize');

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
            attributes: ['IDFilme', 'Foto', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao','ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ]
        });

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        res.render('../views/indexAnonimo', {filmes, cinemas});
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

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        res.render('../views/index', {filmes, user, cinemas});
    },
    
    async pagIndexCliPost(req, res){
        res.render('../views/index');
    },
    
    async pagPerfilUsuarioGet(req, res){
        
        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        res.render('../views/perfilUsuario', {user});
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

        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDSala','Dublado'],
            where: {IDFilme : id/*, Data: datadia.toISOString().split('T')[0]*/ },
        })

        const filmes = await filme.findOne({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Foto', 'Duracao', 'ClassificacoesIndicativa.Idade', 'Genero.Nome'],
            include:[
                {model: classificacao}, 
                {model: generos}
            ],
            where: {IDFilme : id}}
        );
        
        res.render('../views/detalhesFilme', {filmes, user,dias, sessoes});
    },

    async pagDetalhesSessaoFilmeGet(req,res){
        let id_filme = req.params.id;
        let dia = req.params.dia;
        if (!req.session.IDCliente){
            res.redirect('/login')
        }
        let id_cliente = req.session.IDCliente;

        console.log(dia);

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

        let datadia = new Date(dia.replace('.','/')+'/2024');

        console.log(datadia.toISOString().split('T')[0]);
        
        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDSala','Dublado'],
            where: {IDFilme : id_filme/*, Data: datadia.toISOString().split('T')[0]*/ },
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
        let id = req.params.id;
        let id_cliente = req.session.IDCliente;

        const sessoes = await sessao.findOne({
            raw: true,
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDSala','Dublado', 'Filme.Foto', 'Filme.Titulo', 'CinemaLocal.Nome', 'Sala.Numero', 'CinemaLocal.Preco'],
            include:[
                {model: filme},
                {model: cinemaLocal},
                {model: sala}
            ],
            where: {IDSessao : id}
        });

        const user = await cliente.findOne({
            where: { IDCliente: id_cliente },
            raw: true
        });

        const assentos = await assento.findAll({
            raw: true,
            attributes: ['IDAssentos', 'Numero']
        });

        console.log(assentos)

        const tiposIngresso = await tipoIngresso.findAll({
            raw: true,
            attributes: ['IDTipoIngresso', 'Tipo', 'Porcentagem']
        })

        const pagamentos = await pagamento.findAll({
            raw: true,
            attributes: ['IDPagamento', 'Tipo']
        });

        console.log(sessoes);

        res.render('../views/comprarIngresso', {sessoes, pagamentos, assentos, tiposIngresso, user});
    },

    async pagComprarIngressoPost(req, res) {
        res.render('../views/comprarIngresso');
    },

    async pagPagamentoGet(req, res) {
        res.render('../views/pagamento');
    },

    async pagPagamentoPost(req, res) {
        res.render('../views/pagamento');
    },

    async pagPagamentoConcluidoGet(req, res) {
        res.render('../views/pagamentoConcluido');
    },

    async pagPagamentoConcluidoPost(req, res) {
        res.render('../views/pagamentoConcluido');
    }
 
}