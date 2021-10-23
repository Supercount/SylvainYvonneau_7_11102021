const express = require('express');
const routeur = express.Router();

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');

routeur.get('/', postCtrl.getAllPosts);
routeur.get('/:id', postCtrl.getOnePost);
routeur.post('/', postCtrl.createPost);
routeur.put('/:id', postCtrl.modifyPost);
routeur.delete('/:id', postCtrl.deletePost);

routeur.get('/:idpost/comment/', commentCtrl.getComments);
routeur.post('/:idpost/comment/', commentCtrl.createComments);
routeur.delete('/:idpost/comment/:idcom', commentCtrl.deleteComments);
routeur.put('/:idpost/comment/:idcom', commentCtrl.modifyComment);

module.exports = routeur;