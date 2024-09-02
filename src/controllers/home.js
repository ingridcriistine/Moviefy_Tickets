const { where } = require('sequelize');

module.exports = {
    async pagInicialGet(req, res){
        res.render('../views/adm/indexadm');
    },
    
    async pagInicialPost(req, res){
        res.render('../views/adm/indexadm');
    }
}