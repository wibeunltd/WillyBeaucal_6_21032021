// Déclarations des modules requis 
const express = require ('express');
const router = express.Router();

// Déclaration et import du controller user
const userCtrl = require('../controllers/user');

// Gestion de l'entrée d'un mot de passe fort
const input = require('../middleware/inputs-validators')

// Gestion du nombre de requêtes utilisateurs
const accountLimiter = require('../middleware/account-limit-requests')

// Routes users
router.post('/signup', input.passwordValidation, accountLimiter, userCtrl.signup);
router.post('/login', accountLimiter, userCtrl.login);

module.exports = router;