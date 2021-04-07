// Déclarations des modules requis
const rateLimit = require("express-rate-limit");

// Limitation du nombre de requêtes sur les comptes utilisateurs pour une même adresse IP
const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // Délai d'attente pour de nouvelles requêtes : 1 heure
    max: 5, // Blocage après 5 requêtes
    message:
      "Le nombre de requêtes utilisateurs pour cette adresse IP est atteint. Si vous souhaitez effectuer de nouvelles requêtes utilisateurs, veuillez réessayer dans une heure"
  });

module.exports = rateLimit(accountLimiter);