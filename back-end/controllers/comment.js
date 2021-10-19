const db = require("../models");
const Comment = db.Comment;
const User = db.User;
const jwt = require('../utils/jwt');
require('dotenv').config();


module.exports = {
    getComments: function(req,res,next) {
        Comment.findAll({
            attributes: [ 'contenu', 'date', 'idUser'],
            order: [['date', 'DESC']],
            where: { idPost: req.params.idpost }
        })
        .then( retour => {
            let taille = retour.length;
            let compteur =0;
            let listeComments = [];
            retour.forEach(comment => {
                User.findOne({
                    attributes: ['username'],
                    where: {id: comment.idUser}
                })
                .then((user) => {
                    let valeur = {
                        contenu: comment.contenu,
                        date: comment.date,
                        username: user.username
                    };
                    listeComments.push(valeur);
                    compteur++;
                    if (compteur == taille) {
                        return res.status(200).json(listeComments);
                    }
                })
                .catch( error => {
                    return res.status(400).json({error : error});
                })
            });
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
        
    },
    createComments: function(req,res,next) {
        let newContent = req.body.contenu;
        let post = req.params.idpost;
        let writer = jwt.recupereId(req);
        let dateCreate = Date.now();
        Comment.create({
            contenu: newContent,
            idPost: post,
            idUser: writer,
            date: dateCreate
        })
        .then( (newComment)=> {
            return res.status(201).json({commentId:newComment.id,message:"Commentaire créé"})
        })
        .catch((error) => {
            return res.status(400).json({error : `erreur du create : ${error}`});
        });
    },
    deleteComments: function(req,res,next) {
        Comment.findOne({
            attributes: ['idUser'],
            where: { id: req.params.idcom }
        })
        .then( retour => {
            let isAutorised = jwt.checkautorisation(req, retour.idUser);
            if (isAutorised) {
                Comment.destroy({
                    where: { id: req.params.idcom }
                })
                .then( retour => {
                    if (retour == 1) {
                        return res.status(200).json({message : "Commentaire supprimé!"});
                    } else {
                        return res.status(400).json({error : "Problème lors de la suppression"});
                    }
                })
                .catch( error => {
                    return res.status(400).json({error : error});
                })
            } else {
                return res.status(403).json({error : "Vous n'êtes pas autorisé à supprimer ce commentaire!"})
            }
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
    },
    modifyComment: function(req,res,next) {
        Comment.findOne({
            attributes: ['idUser'],
            where: { id: req.params.idcom }
        })
        .then( retour => {
            let isAutorised = jwt.checkautorisation(req, retour.idUser);
            if (isAutorised) {
                
                const newComment =  {
                    contenu : req.body.contenu
                };
                Comment.update(
                    {
                        contenu: newComment.contenu
                    },
                    {where: { id: req.params.idcom }}
                    )
                    .then(()=> {
                        return res.status(201).json({message:"Commentaire modifié"})
                    })
                    .catch((error) => {
                        return res.status(400).json({error : `erreur de l'update : ${error}`});
                    }
                )
            } else {
                return res.status(403).json({error : "Vous n'êtes pas autorisé à modifier ce commentaire!"})
            }
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
    }
}