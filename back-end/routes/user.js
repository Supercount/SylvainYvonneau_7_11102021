const express = require('express');
const routeur = express.Router();

const userCtrl = require('../controllers/user');

routeur.post('/signup', userCtrl.signup);
routeur.post('/login', userCtrl.login);
routeur.get('/', userCtrl.getUsers);
routeur.get('/:id', userCtrl.getUser);
routeur.delete('/:id', userCtrl.deleteUser);

module.exports = routeur;