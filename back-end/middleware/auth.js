require('dotenv').config();
const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
    try {
        const verifiedToken = jwt.parseToken(authorization);
        const userToken = verifiedToken.userId;
        if (req.body.userId && req.body.userId !== userToken) {
            throw "unauthorized request"
        } else {
            next();
        }
    } catch (erreur) {
        return res.status(403).json({error : erreur | "Authentification incorrecte."});
    }
};

