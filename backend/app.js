// Déclarations des modules requis 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');

// Sécurisation des variables d'environnement par un stockage séparé
require('dotenv').config();

// Déclarations des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connection à la base de données NoSQL MongoDB
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_URL + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'instance de l'application
const app = express();

// Sécurisation contre les attaques XSS
app.use(helmet());

// Permission les requêtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Extraction des données JSON du corps de requête
app.use(express.json());

// Gestion du dossier de sauvegarde des images uploadées
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes des sauces et des utilisateurs
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;