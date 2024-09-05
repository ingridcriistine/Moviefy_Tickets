const filme = require('../model/filme');
const classificacao = require('../model/classificacao');
const cinemaLocal = require('../model/cinemaLocal');
const endereco = require('../model/endereco');
const sala = require('../model/sala');
const cliente = require('../model/cliente');
const { where } = require('sequelize');

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

        res.render('../views/adm/sessoes', {cinemas, enderecos, salas});
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
    }
}