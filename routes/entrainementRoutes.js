const express = require('express');
const router = express.Router();
const entrainementController = require('../controller/entrainementController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Récupérer tous les entraînements
router.get('/', auth, entrainementController.getAllEntrainements);
// Récupérer un entraînement par son identifiant
router.get('/:id', auth, entrainementController.getEntrainementById);
// Créer un nouvel entraînement
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, entrainementController.createEntrainement);
// Mettre à jour un entraînement
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, entrainementController.updateEntrainement);
// Supprimer un entraînement
router.delete('/:id', auth, entrainementController.deleteEntrainement);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | Lien                                            | Description                               |
// |---------|-------------------------------------------------|-------------------------------------------|
// | GET     | http://localhost:3000/api/entrainements          | Récupérer tous les entraînements           |
// | GET     | http://localhost:3000/api/entrainements/:id      | Récupérer un entraînement par son ID        |
// | POST    | http://localhost:3000/api/entrainements          | Créer un nouvel entraînement               |
// | PUT     | http://localhost:3000/api/entrainements/:id      | Mettre à jour un entraînement par son ID    |
// | DELETE  | http://localhost:3000/api/entrainements/:id      | Supprimer un entraînement par son ID        |
