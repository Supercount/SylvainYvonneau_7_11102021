const db = require("../models");
const Comment = db.Comment;
const jwt = require('../utils/jwt');
require('dotenv').config();


module.exports = {
    getComments: function(req,res,next) {
        Comment.findAll()
        .then( retour => {
            return res.status(200).json(retour);
        })
        .catch( error => {
            return res.status(400).json({error : error});
        })

    },
    createComments: function(req,res,next) {

    },
    deleteComments: function(req,res,next) {

    },
}