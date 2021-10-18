const express = require('express');
const routeur = express.Router();

const postCtrl = require('../controllers/post');
const commentRoutes = require('./comment');

routeur.get('/', postCtrl.getAllPosts);
routeur.get('/:id', postCtrl.getOnePost);
routeur.post('/', postCtrl.createPost);
routeur.put('/:id', postCtrl.modifyPost);
routeur.delete('/:id', postCtrl.deletePost);

routeur.get('/:id/comment', commentRoutes);

module.exports = routeur;