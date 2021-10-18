const jwt = require('jsonwebtoken');

// Exported functions
module.exports = {
  genererToken: function(user) {
    return jwt.sign({userId : user.id, isAdmin : user.isAdmin}, process.env.SECRET_TOKEN, {expiresIn : "1d"});
  },
  parseToken: function(req) {
    let token = req.headers.authorization.split(' ')[1];
    let verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    return verifiedToken;
  },
  recupereId: function(req) {
    let userId = -1;
    const token = module.exports.parseToken(req);
    if(token != null) {
          userId = token.userId;
    }
    return userId;
  },
  checkAdmin: function(req) {
    let admin = false;
    const token = module.exports.parseToken(req);
    if(token != null) {
          isAdmin = token.isAdmin;
    }
    return admin;
  },
}