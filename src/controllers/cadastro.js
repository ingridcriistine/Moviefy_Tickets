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

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        res.render('../views/adm/registrarCinema', {franquias, cinemasLocal, user});
    },

    async cinemaLocalInsert(req, res) {
        const dados = req.body;

        let foto = 'padrao-cinema.jfif';
        
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

        console.log(cinemas.Foto);

        await endereco.create({
            Logradouro: dados.logradouro,
            Numero: dados.numeroLocal,
            CEP: dados.cep,
            Cidade: dados.cidade,
            IDCinema: cinemas.IDCinemaLocal
        })

        res.redirect('/index');
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

        res.render('../views/login', {clientes, tiposCliente});
    },

    async VerificarEntrada(req, res) {

        dados = req.body;

        const clientes = await cliente.findOne({
            raw: true,
            attributes: ['IDCliente', 'Nome', 'DataNascimento', 'CPF', 'Email', 'Senha', 'Foto', 'IDTipo'],
            where: {Email: dados.emailEntrada}
        });

        console.log(clientes);

        if (clientes) {
            if (dados.senhaEntrada === clientes.Senha) {

                req.session.isLoggedIn = true;
                req.session.IDCliente = clientes.IDCliente;

                console.log(req.session.IDCliente)
                console.log(req.session)
                
                if (clientes.IDTipo === 1) {
                    
                    req.session.IDTipo = 1;
                    console.log(req.session.IDTipo)
                    return res.redirect('/index');
                } else {
                    req.session.IDTipo = 2;
                    console.log(req.session.IDTipo)
                    return res.redirect('/cliente');
                }
            }  
        } 
        res.redirect ('/');
    },

    async clienteInsert(req, res) {
        const dados = req.body;

        let admin = false;
        let idadmin = 2;

        let foto = '../imgs/icon-default.png';

         if (req.file) {
            foto = req.file.filename;
         }
 
         if (dados.email === 'admin@moviefy.com') {
            idadmin = 1
            admin = true;
        };

        await cliente.create({
            Nome: dados.nome,
            DataNascimento: dados.dataNascimento,
            CPF: dados.cpf,
            Email: dados.email,
            Senha: dados.senha,
            Foto: foto,
            IDTipo: idadmin
        });
        
        if (admin) {
            res.redirect('/login');
        } else {
            res.redirect('/login');
        }
    },

    async compra(req, res) {

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

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
       
        res.render('../views/adm/comprarIngresso', {compras, pagamentos, clientes, user});
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

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
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
            attributes: ['IDSessao', 'IDCinema', 'IDFilme', 'IDSala']
        });
       
        res.render('../views/adm/newSessao', {sessoes, cinemas, salas, filmes,user});
    },

    async sessaoInsert(req, res) {
        const dados = req.body;

        console.log(dados)

        await sessao.create({
            TresD: dados.optionslinguagem,
            Dublado: dados.optionsbase,
            Ativa: 1,
            Hora: dados.hora,
            Data: dados.data,
            IDCinema: dados.cinemaLocalid,
            IDSala: dados.salaCinema,
            IDFilme: dados.filmeCinema
        });

        res.redirect('/sessoesAdm');
    },

    async endereco (req, res) {

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

        const cinemas = await cinemaLocal.findAll({
            raw: true,
            attributes: ['IDCinemaLocal', 'Nome', 'Preco', 'Foto']
        })

        const enderecos = await endereco.findAll({
            raw: true,
            attributes: ['IDEndereco', 'Logradouro', 'Numero', 'CEP', 'Cidade']
        })

        res.render('../views/adm/registrarCinema', {enderecos, cinemas, user});
    },

    async filme (req, res) {

        const user = await cliente.findOne({
            where: { IDCliente: req.session.IDCliente },
            raw: true
        });

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

        res.render('../views/adm/registrarFilme', {classificacoes, user, generos, filmes});
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

        res.redirect('/filmesAdm');
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
            attributes: ['IDSessao', 'TresD', 'Ativa', 'Data', 'Hora', 'IDFilme', 'IDCinema', 'IDSala']
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
    }
}