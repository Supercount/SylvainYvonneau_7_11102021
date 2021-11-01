const db = require("../models");
const User = db.User;
const bcryptjs = require('bcryptjs');
const jwt = require('../utils/jwt');
require('dotenv').config();


module.exports = {
    signup: function(req, res, next) {
        let newMail = req.body.email;
        let newName = req.body.username;
        let newPass = req.body.password;
        let admin = (req.body.isAdmin) ? 1 : 0
        if ( newMail == "" || newName == "" || newPass == "" ) {
            return res.status(400).json({error: "Paramètres manquants"});
        }
        bcryptjs.hash(newPass, 10)
        .then((hash) => {
            User.create({
                email: newMail,
                username: newName,
                password: hash,
                isAdmin: admin
            })
            .then( (newUser)=> {
                return res.status(201).json({userId:newUser.id,message:"Utilisateur créé"})
            })
            .catch((error) => {
                return res.status(400).json({error : error});
            });
        })
        .catch(error => {
            return res.status(500).json({error : error});
        });
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
                            token : jwt.genererToken(userFound),
                            admin : userFound.isAdmin,
                            id : userFound.id
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
        User.findAll({
            attributes: ['id', 'username', 'email', 'isAdmin']
        })
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
    },
    getUser: function(req,res,next) {
        User.findOne({
            attributes: ['id', 'username', 'email', 'isAdmin'],
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
        let idToDestroy = req.params.id;
        let isAutorised = jwt.checkautorisation(req, idToDestroy);
        if (isAutorised) {
            User.destroy({
                where: { id: idToDestroy }
            })
            .then( retour => {
                if (retour == 1) {
                    return res.status(200).json({message : "Utilisateur supprimé!"});
                } else {
                    return res.status(400).json({error : "Problème lors de la suppression"});
                }
            })
            .catch( error => {
                return res.status(400).json({error : error});
            })
        } else {
            return res.status(403).json({error : "Vous n'êtes pas autorisé à supprimer cet utilisateur!"})
        }
    }
}