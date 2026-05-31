const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');

require('dotenv').config(); // config pour pouvoir connecter le fichier .env à mongoose

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((error) => {
  console.log('Connexion à MongoDB échouée !');
  console.error(error.message);
});

const app = express();
app.use(express.json()); // Intercepte toutes les requêtes qui ont un content type en json et les met dans l'objet request

app.use((req, res, next) => { // middleware pour accepter le Cross Origin Ressource Sharing (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);


module.exports = app;