const express = require('express');
const router = express.Router();
const matchController = require('../controller/matchController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Routes pour les matchs

// Récupérer tous les matchs
router.get('/', auth, matchController.getAllMatchs);
// Récupérer un match par son identifiant
router.get('/:id', auth, matchController.getMatchById);
// Créer un nouveau match
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, matchController.createMatch);
// Mettre à jour un match
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, matchController.updateMatch);
// Supprimer un match
router.delete('/:id', auth, matchController.deleteMatch);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | URL                                      | Description                           |
// |---------|------------------------------------------|---------------------------------------|
// | GET     | http://localhost:3000/api/matchs         | Récupérer tous les matchs              |
// | GET     | http://localhost:3000/api/matchs/:id     | Récupérer un match par son identifiant |
// | POST    | http://localhost:3000/api/matchs         | Créer un nouveau match                 |
// | PUT     | http://localhost:3000/api/matchs/:id     | Mettre à jour un match                 |
// | DELETE  | http://localhost:3000/api/matchs/:id     | Supprimer un match                     |

