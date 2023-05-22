const express = require('express');
const router = express.Router();
const joueurController = require('../controller/joueurController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Routes pour les joueurs

// Récupérer tous les joueurs
router.get('/joueurs', auth, joueurController.getAllJoueurs);
// Récupérer un joueur par son identifiant
router.get('/joueurs/:id', auth, joueurController.getJoueurById);
// Créer un nouveau joueur
router.post('/joueurs/inscription', multerConfig.upload, multerConfig.convertToWebp, joueurController.createJoueur);
// Mettre à jour un joueur
router.put('/joueurs/:id', auth, multerConfig.upload, multerConfig.convertToWebp, joueurController.updateJoueur);
// Supprimer un joueur
router.delete('/joueurs/:id', auth, joueurController.deleteJoueur);
// Se connecter avec un compte joueur
router.post('/joueurs/connexion', joueurController.connexion);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | Lien                                                       | Description                                 |
// |---------|------------------------------------------------------------|---------------------------------------------|
// | GET     | http://localhost:3000/api/auth/joueurs                      | Récupérer tous les joueurs                   |
// | GET     | http://localhost:3000/api/auth/joueurs/:id                  | Récupérer un joueur par son identifiant       |
// | POST    | http://localhost:3000/api/auth/joueurs/inscription               | Créer un nouveau joueur                      |
// | PUT     | http://localhost:3000/api/auth/joueurs/:id                  | Mettre à jour un joueur                      |
// | DELETE  | http://localhost:3000/api/auth/joueurs/:id                  | Supprimer un joueur                          |
// | POST    | http://localhost:3000/api/auth/joueurs/connexion                 | Se connecter avec un compte joueur            |

