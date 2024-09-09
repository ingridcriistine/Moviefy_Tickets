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

async deletarFilme(req, res){      
    const dados = req.body;
    const id = req.params.id;

    if (dados.envio == 'Excluir') {

        const antigaFoto = await filme.findAll({
            raw: true,
            attributes: ['Foto'],
            where: { IDFilme: id }
        });

        if (antigaFoto[0].Foto != 'padrao-filme.jfif') fs.unlink(`../img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

        await filme.destroy({ where: { IDFilme: id} });
        res.redirect('/filmesAdm');
        return;
    }

    res.redirect('/filmesAdm');
},
async deletarCinema(req, res){      
    const dados = req.body;
    const id = req.params.id;
    
    if (dados.envio == 'Excluir') {

        const antigaFoto = await cinemaLocal.findAll({
            raw: true,
            attributes: ['Foto'],
            where: { IDCinemaLocal: id }
        });

        if (antigaFoto[0].Foto != 'padrao-cinema.jfif') fs.unlink(`../img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

        await cinemaLocal.destroy({ where: { IDCinemaLocal: id} });
        res.redirect('/cinemasAdm');
        return;
    }

    res.redirect('/cinemasAdm');
},
async deletarSessao(req, res){      
    const dados = req.body;
    const id = req.params.id;
    
    if (dados.envio == 'Excluir') {

        await sessao.destroy({ where: { IDSessao: id} });
        res.redirect('/sessoesAdm');
        return;
    }

    res.redirect('/sessoesAdm');
}
}