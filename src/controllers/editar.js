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
const linguagem = require('../model/linguagem')
const pagamento = require('../model/pagamento')
const tipoCliente = require('../model/tipoCliente')
const tipoIngresso = require('../model/tipoIngresso');
const { raw } = require('express');

module.exports = {
    
    async clientes(req, res) {

        const parametro = req.params.id;
        console.log(parametro);

        const clientes = await cliente.findByPk(parametro, {
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha', 'Foto', 'IDTipo']
        });

        const tiposCliente = await tipoCliente.findAll({
            raw: true,
            attributes: ['IDTipoCliente', 'Tipo']
        });

        res.render('../views/editarPerfil', {clientes, tiposCliente});
    },

    async adicionarCliente(req, res){

        const dados = req.body;
        const id = req.params.id;

        if (dados.envio == 'Excluir') {

            const antigaFoto = await cliente.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDCliente: id }
            });

            if (antigaFoto[0].Foto != 'icon-default.png') fs.unlink(`public/imgs/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            await cliente.destroy({ where: { IDCliente: id } });
            res.redirect('/');
            return;
        }

        if (req.file) {
            const antigaFoto = await cliente.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDCliente: id }
            });

            if (antigaFoto[0].Foto != 'icon-default.png') fs.unlink(`public/imgs/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            await cliente.update(
                {Foto: req.file.filename},
                {where: { IDCliente: id }}
            );
        }

        await cliente.update({
            Nome: dados.nome,
            DataNascimento: dados.dataNascimento,
            CPF: dados.cpf,
            Email: dados.email,
            Senha: dados.senha,
            Foto: foto,
            IDTipo: dados.tipoCliente
        },
        {
            where: { IDCliente: id }
        });

        console.log(dados);

        res.redirect('/');
    },
}