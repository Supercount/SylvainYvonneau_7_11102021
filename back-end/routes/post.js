const express = require('express');
const routeur = express.Router();

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const validChamps = require('../middleware/validChamps');

routeur.get('/', postCtrl.getAllPosts);
routeur.get('/:id', postCtrl.getOnePost);
routeur.post('/', validChamps, postCtrl.createPost);
routeur.put('/:id', validChamps, postCtrl.modifyPost);
routeur.delete('/:id', postCtrl.deletePost);

routeur.get('/:idpost/comment/', commentCtrl.getComments);
routeur.post('/:idpost/comment/', validChamps, commentCtrl.createComments);
routeur.delete('/:idpost/comment/:idcom', commentCtrl.deleteComments);

module.exports = routeur;