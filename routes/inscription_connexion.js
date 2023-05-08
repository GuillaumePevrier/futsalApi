const express = require("express");
const router = express.Router();

const joueurRoutes = require("../controller/inscription_connexion");



router.post("/inscription", joueurRoutes.inscription);
router.post("/connexion", joueurRoutes.connexion);


module.exports = router;