// Déclarations des modules requis
const express = require('express');
const router = express.Router();

// Déclaration et import du controller sauce et de l'authentification
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

// Gestion des fichiers entrants
const multer = require('../middleware/multer-config');

// Routes sauces
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeStatusSauce);

module.exports = router;