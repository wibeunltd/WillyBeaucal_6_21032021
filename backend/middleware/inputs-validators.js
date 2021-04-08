/* ------------ Middleware de validation des entrées utilisateurs ------------*/

// Validation du mot de passe, avec obligation de créer un mot de passe fort
exports.passwordValidation = (req, res, next) => {
    const pwdValidation = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])(?=.{8,100})');
    if (pwdValidation.test(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ error: 'Votre mot de passe doit contenir au minimum 8 caractères, dont 1 chiffre, 1 minuscule, 1 majuscule, 1 des symboles suivants !@#$%&* ' });
    }
};


// Validation des inputs d'une sauce, seuls les caractères alpha-numériques et . - , sont autorisés
exports.sauceFormValidation = (req, res, next) => {
    const sauceInputValidation = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,-.\'!]*$');
    if (sauceInputValidation.test(req.body.name) && sauceInputValidation.test(req.body.manufacturer) && sauceInputValidation.test(req.body.description) && sauceInputValidation.test(req.body.mainPepper)) {
        next();
    } else {
        return res.status(400).json({ error: "Merci de n'utiliser ques des caractères alpha-numériques ou les symboles , . - ' !" });
    }
};