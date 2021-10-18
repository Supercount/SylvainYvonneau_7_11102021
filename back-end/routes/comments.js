const express = require('express');
const routeur = express.Router();

const commentCtrl = require('../controllers/comments');

routeur.get('/', commentCtrl.getComments);
routeur.post('/', commentCtrl.createComments);
routeur.delete('/:id', commentCtrl.deleteComments);

module.exports = routeur;