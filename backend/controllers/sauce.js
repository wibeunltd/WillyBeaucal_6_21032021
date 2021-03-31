const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce avec suppression de l'ancienne image, en cas de modification d'image
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    if (req.file) {
        Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce et/ou image modifiée(s) !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        }).catch(error => res.status(400).json({ error }));
    } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
          .catch(error => res.status(400).json({ error }));
    }
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de toutes les sauces
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Récupération d'une sauce
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
         .then(sauces => res.status(200).json(sauces))
         .catch(error => res.status(400).json({ error }));
};

// Status j'aime des sauces
exports.likeStatusSauce = (req, res, next) => {
    const userID = req.body.userId;

    switch (req.body.like) {
        // L'utilisateur aime une sauce
        case 1:
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked : userID } })
                .then(() => res.status(200).json({ message: "L'utilisateur aime la sauce !"}))
                .catch(error => res.status(400).json({ error }));
        break;

        // L'utilisateur n'aime pas une sauce
        case -1:
            Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked : userID } })
                .then(() => res.status(200).json({ message: "L'utilisateur n'aime pas la sauce !"}))
                .catch(error => res.status(400).json({ error }));
        break;
        
        // L'utilisateur annule son choix (ce qu'il aime ou n'aime pas)
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    // L'utilisateur a aimé la sauce
                    if (sauce.usersLiked.includes(userID)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked : userID } })
                            .then(() => res.status(200).json({ message: "L'utilisateur annule le fait d'aimer la sauce !"}))
                            .catch(error => res.status(400).json({ error }));
                    } else {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDiskliked : userID } })
                            .then(() => res.status(200).json({ message: "L'utilisateur annule le fait de ne plus aimer la sauce !"}))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch((error) => res.status(400).json({ error }));
        break;
    }
};
