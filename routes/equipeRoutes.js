const express = require('express');
const router = express.Router();
const equipeController = require('../controller/equipeController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Routes pour les équipes

// Récupérer toutes les équipes
router.get('/', auth, equipeController.getAllEquipes);
// Récupérer une équipe par son identifiant
router.get('/:id', auth, equipeController.getEquipeById);
// Créer une nouvelle équipe
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, equipeController.createEquipe);
// Mettre à jour une équipe
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, equipeController.updateEquipe);
// Supprimer une équipe
router.delete('/:id', auth, equipeController.deleteEquipe);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | Lien                                        | Description                             |
// |---------|---------------------------------------------|-----------------------------------------|
// | GET     | http://localhost:3000/api/equipes            | Récupérer toutes les équipes            |
// | GET     | http://localhost:3000/api/equipes/:id        | Récupérer une équipe par son identifiant |
// | POST    | http://localhost:3000/api/equipes            | Créer une nouvelle équipe                |
// | PUT     | http://localhost:3000/api/equipes/:id        | Mettre à jour une équipe                 |
// | DELETE  | http://localhost:3000/api/equipes/:id        | Supprimer une équipe                     |

