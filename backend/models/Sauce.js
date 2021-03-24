const mongoose = require('mongoose');

// Schéma de données pour une sauce
const sauceSchema = mongoose.Schema( {
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    userLiked: { type: [String], required: true},
    userDisliked: { type: [String], required: true}
});

// Exportation du modèle de sauce
module.exports = mongoose.model('Sauce', sauceSchema);