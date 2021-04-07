// Déclarations des modules requis
const multer = require('multer');

// Définitions des formats acceptés
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Définition taille maximum des fichiers
const maxSize = 1 * 1000 * 1000; 

// Définitions du dossier de stockage et du nom du fichier stocké
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
    limits: {fileSize: maxSize}
});

module.exports = multer({ storage }).single('image');