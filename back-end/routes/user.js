const express = require('express');
const routeur = express.Router();

const userCtrl = require('../controllers/user');
// const mailValid = require('../middleware/validerMail');
// const antiForce = require('../middleware/bruteForce');

routeur.post('/signup', userCtrl.signup);
routeur.post('/login', userCtrl.login);

module.exports = routeur;