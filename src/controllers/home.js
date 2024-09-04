const filme = require('../model/filme');
const classificacao = require('../model/classificacao')
const { where } = require('sequelize');

module.exports = {
    async pagInicialGet(req, res){
        res.render('../views/adm/indexadm');
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
    }
}