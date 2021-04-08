// Déclarations des modules requis
const mongoose = require('mongoose');

// Schéma de données pour une sauce
const sauceSchema = mongoose.Schema( {
    userId: { type: String, required: true},
    name: { type: String, required: true, maxLength:20},
    manufacturer: { type: String, required: true, maxLength:20},
    description: { type: String, required: true, minLength:10},
    mainPepper: { type: String, required: true, maxLength:100},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true, max:10},
    likes: { type: Number, required: false, default: 0},
    dislikes: { type: Number, required: false, default: 0},
    usersLiked: { type: [String], required: false},
    usersDisliked: { type: [String], required: false}
});

// Exportation du modèle de sauce
module.exports = mongoose.model('Sauce', sauceSchema);