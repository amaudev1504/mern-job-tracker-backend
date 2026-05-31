const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10) // La méthode bcrypt.hash() permet de hasher un mot de passe afin de le sécuriser. pour un hashage sécurisé, on le hash 10 fois, donc le salt = 10
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                role: req.body.role,
                avatar: req.body.avatar,
                phone: req.body.phone,
                bio: req.body.bio,
                skills: req.body.skills,
                resume: req.body.resume
            });
            user.save()
                .then(() => {res.status(201).json({ message: "Utilisateur créé" })})
                .catch(error => {res.status(400).json({ error })}); // Une erreur 400, aussi appelée “400 Bad Request”, signifie que le serveur n’a pas pu comprendre ou traiter la requête envoyée par ton navigateur, ton application ou ton outil
        })
        .catch(error => res.status(500).json({ error })); // erreur 500 = erreur de serveur
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                res.status(401).json({ message: "Adresse email incorrecte" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            res.status(401).json({ message: "Mot de passe incorrect" })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.JWT_SECRET,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {res.status(500).json({ error })});
            }
        })
        .catch(error => {res.status(500).json({ error })});
};

// Logout = POST
exports.logout = (req, res) => {
    return res.status(200).json({
      message: "Utilisateur déconnecté"
    });
};
