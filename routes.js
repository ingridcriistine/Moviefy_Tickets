const express = require('express');
const route = express.Router();

const multer = require("multer");

const config = require('./src/config/multer');
const home = require('./src/controllers/home');
const padrao = require('./src/controllers/padrao');

route.get('/', home.pagInicialGet);
route.get('/index', home.pagInicialGet);

route.post('/', home.pagInicialPost);
route.post('/index', home.pagInicialPost);

route.get('/franquia', padrao.franquia);


module.exports = route;