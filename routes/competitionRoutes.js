const express = require('express');
const router = express.Router();
const competitionController = require('../controller/competitionController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Routes pour les compétitions

// Récupérer toutes les compétitions
router.get('/', auth, competitionController.getAllCompetitions);
// Récupérer une compétition par son identifiant
router.get('/:id', auth, competitionController.getCompetitionById);
// Créer une nouvelle compétition
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, competitionController.createCompetition);
// Mettre à jour une compétition
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, competitionController.updateCompetition);
// Supprimer une compétition
router.delete('/:id', auth, competitionController.deleteCompetition);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | URL                                             | Description                                   |
// |---------|-------------------------------------------------|-----------------------------------------------|
// | GET     | http://localhost:3000/api/competitions           | Récupérer toutes les compétitions              |
// | GET     | http://localhost:3000/api/competitions/:id       | Récupérer une compétition par son identifiant   |
// | POST    | http://localhost:3000/api/competitions           | Créer une nouvelle compétition                 |
// | PUT     | http://localhost:3000/api/competitions/:id       | Mettre à jour une compétition                  |
// | DELETE  | http://localhost:3000/api/competitions/:id       | Supprimer une compétition                      |

