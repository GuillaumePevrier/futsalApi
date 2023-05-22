const express = require('express');
const clubController = require('../controller/clubController');

const router = express.Router();

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Routes pour les clubs

// Route pour récupérer tous les clubs
router.get('/', auth, clubController.getAllClubs);
// Route pour récupérer un club par son identifiant
router.get('/:id', auth, clubController.getClubById);
// Route pour créer un club
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, clubController.createClub);
// Route pour mettre à jour un club
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, clubController.updateClub);
// Route pour supprimer un club
router.delete('/:id', auth, clubController.deleteClub);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | URL                                | Description                           |
// |---------|------------------------------------|---------------------------------------|
// | GET     | http://localhost:3000/api/club     | Récupérer tous les clubs              |
// | GET     | http://localhost:3000/api/club/:id | Récupérer un club par son identifiant |
// | POST    | http://localhost:3000/api/club     | Créer un nouveau club                 |
// | PUT     | http://localhost:3000/api/club/:id | Mettre à jour un club                 |
// | DELETE  | http://localhost:3000/api/club/:id | Supprimer un club                     |
