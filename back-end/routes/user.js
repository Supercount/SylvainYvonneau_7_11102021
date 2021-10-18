const express = require('express');
const routeur = express.Router();

const userCtrl = require('../controllers/user');
const antiForce = require('../middleware/bruteForce');
const mailValid = require('../middleware/validerMail');

routeur.post('/signup', mailValid, userCtrl.signup);
routeur.post('/login', mailValid, antiForce, userCtrl.login);
routeur.get('/', userCtrl.getUsers);
routeur.get('/:id', userCtrl.getUser);
routeur.delete('/:id', userCtrl.deleteUser);

module.exports = routeur;