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
                    return res.status(500).json({error : `${error} catch du bcryptsjs`});
                });
            } else { () => {
                return res.status(409).json({error: 'Utilisateur existant' });
                }
            }
        })
        .catch((error) => res.status(500).json({error: `${error} catch du findOne`}));
    
        // bcryptjs.hash(password,10)
        // .then( hash => {
        //     // const user = new User({
        //     //     email : req.body.email,
        //     //     password : hash,
        //     //     username : req.body.username,
        //     //     isadmin : false
        //     // });
        //     const user = User.build({ 
        //         email : email,
        //         password : hash,
        //         username : username,
        //         isadmin : isAdmin
        //     });
        //     user.save()
        //     .then( () => res.status(201).json({message : "Utilisateur inscrit!"}))
        //     .catch(error => {
        //         return res.status(400).json({error : `${error} problème de save1`});
        //     });
        // })
        // .catch( error => {
        // return res.status(500).json({error : `${error} problème de save2`});
        // })
    },    
    login: function(req, res, next) {
        User.findOne({email : req.body.email})
        .then( user => {
            if (user == null) {
                return res.status(401).json({error : "Utilisateur inexistant!"});
            } else {
                bcryptjs.compare(req.body.password,user.password)
                .then( isValid => {
                    if (isValid) {
                        return res.status(200).json({
                            userId : user._id,
                            token : jwt.sign({userId : user._id}, process.env.SECRET_TOKEN, {expiresIn : "1d"})
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
    }
}