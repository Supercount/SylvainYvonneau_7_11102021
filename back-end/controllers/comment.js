const db = require("../models");
const Comment = db.Comment;
const User = db.User;
const jwt = require('../utils/jwt');
require('dotenv').config();


module.exports = {
    getComments: function(req,res,next) {
        Comment.findAll({
            // attributes: [ 'contenu', 'date', 'idUser'],
            order: [['date', 'DESC']],
            where: { idPost: req.params.idpost },
            // include: [User]
            // include: [{
            //     model: 'User',
            //     required: true
            // }]
        })
        .then( retour => {
            return res.status(200).json(retour);
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
    },
    modifyComment: function(req,res,next) {
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
        })}
}