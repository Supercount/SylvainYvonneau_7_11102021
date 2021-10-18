const db = require("../models");
const Post = db.Post;
const User = db.User;
const jwt = require('../utils/jwt');
require('dotenv').config();


module.exports = {
    getAllPosts: function (req,res,next) {
        Post.findAll({
            attributes: [ 'titre', 'contenu', 'date', 'idUser'],
            order: [['date', 'DESC']],
            // include: [{model: User}]
        })
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : error});
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
        Post.destroy({
            where: { id: req.params.id }
        })
        .then( retour => {
            if (retour == 1) {
                return res.status(200).json({message : "Post supprimé!"});
            } else {
                return res.status(400).json({error : "Problème lors de la suppression"});
            }
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })
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