const db = require("../models");
const User = db.User;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    signup: function(req, res, next) {
        let newMail = req.body.email;
        let newName = req.body.username;
        let newPass = req.body.password;
        if ( newMail == null || newName == null || newPass == null ) {
            return res.status(400).json({error: "Paramètres manquants"});
        }
        User.findOne({
            attributes: ['email'],
            where: { email: newMail }
        })
        .then( (user) => {
            if (!user) {
                bcryptjs.hash(newPass, 10)
                .then((hash) => {
                    User.create({
                        email: newMail,
                        username: newName,
                        password: hash,
                        isAdmin: 0
                    })
                    .then( (newUser)=> {
                        return res.status(201).json({userId:newUser.id,message:"utilisateur créé"})
                    })
                    .catch((error) => {
                        return res.status(400).json({error : error});
                    });
                })
                .catch(error => {
                    return res.status(500).json({error : error});
                });
            } else { () => {
                return res.status(409).json({error: 'Utilisateur existant' });
                }
            }
        })
        .catch((error) => res.status(500).json({error: error}));
    },    
    login: function(req, res, next) {
        let newMail = req.body.email;
        let newPass = req.body.password;
        User.findOne({
            where: { email: newMail }
        })
        .then( userFound => {
            if (!userFound) {
                return res.status(401).json({error : "Utilisateur inexistant!"});
            } else {
                bcryptjs.compare(newPass,userFound.password)
                .then( isValid => {
                    if (isValid) {
                        return res.status(200).json({
                            token : jwt.sign({userId : userFound.id, isAdmin : userFound.isAdmin}, process.env.SECRET_TOKEN, {expiresIn : "1d"})
                        });
                    } else {
                        return res.status(401).json({error : "Mot de passe incorrect!"});
                    }
                })
                .catch(error => {
                    return res.status(500).json({error : error});
                })
            }
        })
        .catch( error => {
            return res.status(500).json({error : error});
        });
    },
    getUsers: function(req,res,next) {
        User.findAll()
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
    },
    getUser: function(req,res,next) {
        User.findOne({
            where: { id: req.params.id }
        })
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
    },
    deleteUser: function(req,res,next) {
        User.destroy({
            where: { id: req.params.id }
        })
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : "problème de récup"});
        })
    }
}