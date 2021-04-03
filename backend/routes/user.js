// Déclarations des modules requis 
const express = require ('express');
const router = express.Router();

// Déclaration et import du controller user
const userCtrl = require('../controllers/user');

// Routes users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;