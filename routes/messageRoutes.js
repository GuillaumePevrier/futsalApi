const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Créer un nouveau message
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, messageController.creerMessage);
// Récupérer tous les messages
router.get('/', auth, messageController.getMessages);
// Récupérer un message par son identifiant
router.get('/:id', auth, messageController.getMessageById);
// Mettre à jour un message
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, messageController.updateMessage);
// Supprimer un message
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;

// Tableau des adresses à tester avec Postman :

// | Méthode | URL                                      | Description                           |
// |---------|------------------------------------------|---------------------------------------|
// | GET     | http://localhost:3000/api/messages       | Récupérer tous les messages           |
// | GET     | http://localhost:3000/api/messages/:id   | Récupérer un message par son id       |
// | POST    | http://localhost:3000/api/messages       | Créer un nouveau message              |
// | PUT     | http://localhost:3000/api/messages/:id   | Mettre à jour un message              |
// | DELETE  | http://localhost:3000/api/messages/:id   | Supprimer un message                  |