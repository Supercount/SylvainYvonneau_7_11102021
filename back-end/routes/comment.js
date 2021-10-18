const express = require('express');
const routeur = express.Router();

const commentCtrl = require('../controllers/comment');

routeur.get('/', commentCtrl.getComments);
routeur.post('/', commentCtrl.createComments);
routeur.delete('/:idcom', commentCtrl.deleteComments);

module.exports = routeur;