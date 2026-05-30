const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // On récupère le header et dans la partie authorisation, spliter bearer et token en 2 mots et nous récupérons le token qui est en 2è
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // On décode le token avec verify on donne le token et la clé secrète en paramètres
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    next();
    } catch(error) {
        res.status(401).json({ error });
    }
};
