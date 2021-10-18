const db = require("../models");
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;
const jwt = require('../utils/jwt');
require('dotenv').config();


module.exports = {
    getAllPosts: function (req,res,next) {
        Post.findAll({
            // attributes: [ 'titre', 'contenu', 'date', 'idUser'],
            order: [['date', 'DESC']],
            // include: 'user'
            // include: [{
            //     all: true
            // }]
        })
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : `voici l'erreur du find : ${error}`});
        })
    },
    getOnePost: function (req,res,next) {
        Post.findOne({
            where: { id: req.params.id }
        })
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
        
    },
    deletePost: function (req,res,next) {
        let postId = req.params.id;
        let isAutorised = jwt.checkautorisation(req, postId);
        if (isAutorised) {
            Post.destroy({
                where: { id: postId }
            })
            .then( retour => {
                if (retour == 1) {
                    Comment.destroy({
                        where: { idPost: postId }
                    })
                    .then( retour => {
                        if (retour == 1) {
                            return res.status(200).json({message : "Post et commentaires supprimés!"});
                        } else {
                            return res.status(400).json({error : "Problème lors de la suppression des commentaires associés"});
                        }
                    })
                    .catch( error => {
                        return res.status(400).json({error : error});
                    })
                } else {
                    return res.status(400).json({error : "Problème lors de la suppression du post"});
                }
            })
            .catch( error => {
                return res.status(400).json({error : error});
            })
        } else {
            return res.status(403).json({error : "Vous n'êtes pas autorisé à supprimer ce post!"})
        }
    },
    createPost: function (req,res,next) {
        let newImage = (req.file != null) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
        let newTitle = req.body.titre;
        let newContent = req.body.contenu;
        let writer = jwt.recupereId(req);
        let dateCreate = Date.now();
        if ( newTitle == null || newContent == null) {
            return res.status(400).json({error: "Paramètres manquants"});
        }
        Post.create({
            titre: newTitle,
            contenu: newContent,
            idUser: writer,
            imageURL: newImage,
            date: dateCreate
        })
        .then( (newPost)=> {
            return res.status(201).json({postId:newPost.id,message:"Post créé"})
        })
        .catch((error) => {
            return res.status(400).json({error : `erreur du create : ${error}`});
        });
    },
    modifyPost: function (req,res,next) {
        
    }
}