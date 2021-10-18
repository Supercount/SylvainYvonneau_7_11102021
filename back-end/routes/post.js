const express = require('express');
const routeur = express.Router();

const postCtrl = require('../controllers/post');

routeur.get('/', postCtrl.getAllPosts);
routeur.get('/:id', postCtrl.getOnePost);
routeur.post('/', postCtrl.createPost);
routeur.put('/:id', postCtrl.modifyPost);
routeur.delete('/:id', postCtrl.deletePost);

module.exports = routeur;