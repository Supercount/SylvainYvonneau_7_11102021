
module.exports = (req, res, next) => {
    const regex = /^[a-zA-Z][ \'\-a-zA-Zéèàùïêôî0-9.!?,]*$/;
    if (!regex.test(req.body.titre) || !regex.test(req.body.contenu)) {
        res.status(403).json({message : "Vous ne pouvez pas utiliser de caractères spéciaux pour remplir ce formulaire!"})
    } else {
        next();
    }
};
