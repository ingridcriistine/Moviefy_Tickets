const cinemaLocal = require('../model/cinemaLocal');
const cliente = require('../model/cliente');
const compra = require('../model/compra');
const endereco = require('../model/endereco');
const filme = require('../model/filme');
const ingresso = require('../model/ingresso');
const sala = require('../model/sala');
const sessao = require('../model/sessao');

const franquia = require('../model/franquia')
const genero = require('../model/genero')
const assento = require('../model/assento')
const classificacao = require('../model/classificacao')
const pagamento = require('../model/pagamento')
const tipoCliente = require('../model/tipoCliente')
const tipoIngresso = require('../model/tipoIngresso');
const { raw } = require('express');

const fs = require("fs");
const { param } = require('../../routes');

module.exports = {
    
    async filmes(req, res) {

        const parametro = req.params.id;

        const filmes = await filme.findByPk(parametro, {
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'DataEstreia', 'DataSaida',  'Duracao', 'Foto', 'IDGenero', 'IDClassificacao']
        });

        const classificacoes = await classificacao.findAll({
            raw: true,
            attributes: ['IDClassificacao', 'Idade']
        });

        const generos = await genero.findAll({
            raw: true,
            attributes: ['IDGenero', 'Nome']
        });

        res.render('../views/adm/editarFilme', {filmes, generos, classificacoes});
    },

    async adicionarFilme(req, res){

        const dados = req.body;
        const id = req.params.id;


        if (req.file) {
            const antigaFoto = await filme.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDFilme: id }
            });

            if (antigaFoto[0].Foto != 'padrao-filme.jfif') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            
            await filme.update(
                {Foto: req.file.filename},
                {where: { IDFilme: id }}
            );
        }


        await filme.update({
            Titulo: dados.titulo,
            DataEstreia: dados.dataEstreia,
            DataSaida: dados.dataSaida,
            Duracao: dados.duracao,
            IDGenero: dados.genero,
            IDClassificacao: dados.classificacao
        },
        {
            where: { IDFilme: id }
        });

        res.redirect('/filmesAdm');
    },
    
    async cinemas(req, res) {

        const parametro = req.params.id;

       

        res.render('../views/adm/editarCinema');
    },

    async adicionarCinema(req, res){

        const dados = req.body;
        const id = req.params.id;


        if (req.file) {
            const antigaFoto = await filme.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDFilme: id }
            });

            if (antigaFoto[0].Foto != 'padrao-filme.jfif') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            
            await filme.update(
                {Foto: req.file.filename},
                {where: { IDFilme: id }}
            );
        }


        await filme.update({
            Titulo: dados.titulo,
            DataEstreia: dados.dataEstreia,
            DataSaida: dados.dataSaida,
            Duracao: dados.duracao,
            IDGenero: dados.genero,
            IDClassificacao: dados.classificacao
        },
        {
            where: { IDFilme: id }
        });

        res.redirect('/filmesAdm');
    },
}