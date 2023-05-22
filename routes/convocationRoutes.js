const express = require('express');
const router = express.Router();
const convocationController = require('../controller/convocationController');

const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');

// Créer une convocation
router.post('/', auth, multerConfig.upload, multerConfig.convertToWebp, convocationController.createConvocation);
// Obtenir toutes les convocations
router.get('/', auth, convocationController.getAllConvocations);
// Obtenir une convocation par son ID
router.get('/:id', auth, convocationController.getConvocationById);
// Mettre à jour une convocation
router.put('/:id', auth, multerConfig.upload, multerConfig.convertToWebp, convocationController.updateConvocation);
// Supprimer une convocation
router.delete('/:id', auth, convocationController.deleteConvocation);

module.exports = router;

// Tableau des liens à tester avec Postman :

// | Méthode | Lien                                      | Description                               |
// |---------|-------------------------------------------|-------------------------------------------|
// | POST    | http://localhost:3000/api/convocations    | Crée une nouvelle convocation             |
// | GET     | http://localhost:3000/api/convocations    | Obtient toutes les convocations           |
// | GET     | http://localhost:3000/api/convocations/:id| Obtient une convocation par son ID         |
// | PUT     | http://localhost:3000/api/convocations/:id| Met à jour une convocation par son ID      |
// | DELETE  | http://localhost:3000/api/convocations/:id| Supprime une convocation par son ID        |

