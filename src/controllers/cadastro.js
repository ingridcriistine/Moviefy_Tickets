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
const { where } = require('sequelize');

module.exports = {
    async cinemaLocal(req, res) {

        const franquias = await franquia.findAll({
            raw: true,
            attributes: ['IDFranquia', 'Nome']
        });

        const cinemasLocal = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome']
        });


        res.render('../views/adm/registrarCinema', {franquias, cinemasLocal});
    },

    async cinemaLocalInsert(req, res) {
        const dados = req.body;

        let foto = '../img/padrao-cinema.jfif';
        
        if (req.file) {
            foto = req.file.filename;
        }

        await cinemaLocal.create({
            Nome: dados.nome,
            Preco: dados.preco,
            Foto: foto,
            IDFranquia: dados.franquia
        });

        const cinemas = await cinemaLocal.findOne({
            raw: true,
            order:[['createdAt','DESC']]
        })

        await endereco.create({
            Logradouro: dados.logradouro,
            Numero: dados.numeroLocal,
            CEP: dados.cep,
            Cidade: dados.cidade,
            IDCinemaLocal: cinemas.IDCinemaLocal
        })

        res.redirect('/');
    },

    async cliente(req, res) {

        const clientes = await cliente.findAll({
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha', 'Foto', 'IDTipo']
        });

        const tiposCliente = await tipoCliente.findAll({
            raw: true,
            attributes: ['IDTipoCliente', 'Tipo']
        });

        res.render('../views/index', {clientes, tiposCliente});
    },

    async clienteInsert(req, res) {
        const dados = req.body;

        let foto = '../imgs/icon-default.png';

         if (req.file) {
            foto = req.file.filename;
         }
 

        await cliente.create({
            Nome: dados.nome,
            DataNascimento: dados.dataNascimento,
            CPF: dados.cpf,
            Email: dados.email,
            Senha: dados.senha,
            Foto: foto,
            IDTipo: dados.tipoCliente
        });

        res.redirect('/');
    },

    async compra(req, res) {

        const pagamentos = await pagamento.findAll({
            raw: true,
            attributes: ['IDPagamento', 'Tipo']
        });

        const clientes = await cliente.findAll({
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha','Foto']
        });

        const compras = await compra.findAll({
            raw: true,
            attributes: ['IDCompra', 'IDPagamento', 'IDCliente']
        });
       
        res.render('../views/adm/comprarIngresso', {compras, pagamentos, clientes});
    },

    async compraInsert(req, res) {
        const dados = req.body;

        await compra.create({
            IDPagamento: dados.tipoPagamento,
            IDCliente: dados.cliente
        });

        res.redirect('/pagamentoConcluido');
    },

    async sessao(req, res) {

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        });

        const linguagens = await linguagem.findAll({
            raw: true,
            attributes: ['IDLinguagem', 'Linguagem']
        });

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Numero']
        });

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo']
        })

        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao']
        });
       
        res.render('../views/adm/newSessao', {sessoes, cinemas, linguagens, salas, filmes});
    },

    async sessaoInsert(req, res) {
        const dados = req.body;

        await sessao.create({
            TresD: dados.tresD,
            Ativa: dados.ativa,
            Data: dados.data,
            IDCinemaLocal: dados.cinemaLocal,
            IDLinguagem: dados.linguagem,
            IDSala: dados.sala
        });

        res.redirect('/');
    },

    async endereco (req, res) {

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        })

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['IDEndereco', 'Logradouro', 'Numero', 'CEP', 'Cidade']
        })

        res.render('../views/adm/registrarCinema', {enderecos, cinemas});
    },

    // async enderecoInsert (req, IDCinema) {
    //     const dados = req.body;

    //     await endereco.create({
    //         Logradouro: dados.logradouro,
    //         numero: dados.numero,
    //         CEP: dados.cep,
    //         Cidade: dados.cidade,
    //         IDCinemaLocal: IDCinema
    //     })
    // },

    async filme (req, res) {

        const generos = await genero.findAll({
            raw: true,
            attributes: ['IDGenero', 'Nome']
        })

        const classificacoes = await classificacao.findAll({
            raw: true,
            attributes: ['IDClassificacao', 'Idade']
        })

        const filmes = await filme.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo']
        })

        res.render('../views/adm/registrarFilme', {classificacoes, generos, filmes});
    },

    async filmeInsert (req, res) {
        const dados = req.body;

        let foto = '../img/padrao-filme.jfif';
        
        if (req.file) {
            foto = req.file.filename;
        }

        await filme.create({
            Titulo: dados.titulo,
            DataEstreia: dados.dataEstreia,
            DataSaida: dados.dataSaida,
            Duracao: dados.duracao,
            Foto: foto,
            IDGenero: dados.genero,
            IDClassificacao: dados.classificacao
        })

        res.redirect('/');
    },

    async ingresso (req, res) {
        
        const ingressos = await ingresso.findAll({
            raw: true,
            attributes: ['IDIngresso', 'IDTipo', 'IDAssento', 'IDSessao', 'NumeroCompra']
        })
        
        const tiposIngresso = await tipoIngresso.findAll({
            raw: true,
            attributes: ['IDTipoIngresso', 'Tipo', 'Porcentagem']
        })
        
        const sessoes = await sessao.findAll({
            raw: true,
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDLinguagem', 'IDSala']
        })
        
        const compras = await compra.findAll({
            raw: true,
            attributes: ['IDCompra', 'IDPagamento', 'IDCliente']
        })
        
        const assentos = await assento.findAll({
            raw: true,
            attributes: ['IDAssento', 'Numero']
        })
        
        res.render('../views/comprarIngresso', {ingressos, tiposIngresso, sessoes, compras, assentos});
    },

    async ingressoInsert (req, res) {
        const dados = req.body;

        await ingresso.create({
            IDTipo: dados.tipo,
            IDAssento: dados.assento,
            IDSessao: dados.sessao,
            NumeroCompra: dados.numero
        })
        
        res.redirect('../views/pagamentoConcluido');
    },

    async sala (req, res) {
        
        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        })
        
        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Numero']
        })
        
        res.render('../views/adm/registrarSala', {salas, cinemas});
    },
    
    async salaInsert (req, res) {
        
        const dados = req.body;

        await sala.create({
            Numero: dados.numero
        })

        res.redirect('../views/adm/cinemasAdm');
    }
}