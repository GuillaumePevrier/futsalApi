const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const auth = require('../middleware/auth');

const Joueurs = require('../models/Joueurs');

// Récupération de tous les utilisateurs
router.get('/joueurs', auth, async (req, resp) => {
	console.log('Recherche de tous les joueurs en base de données...');
	const result_joueurs = await Joueurs.find();
	resp.status(200).json(result_joueurs);
});

// Récupération de l'utilisateur dont le nom
// est passé en paramètre via :Nom
router.get('/joueurs/:Id', auth, async (req, resp) => {
	console.log("Recherche d'un joueur en base de données...");
	const { Id } = req.params;
	const result_joueur = await Joueurs.findById(Id);
	resp.status(200).json(result_joueur);
});

// Ajout d'un utilisateur
router.post('/joueurs', (req, resp) => {
	console.log("Ajout d'un nouveau joueur en base de données...");
	bcrypt
		.hash(req.body.Mot_de_passe, 10)
		.then(hash => {
			const new_joueur = new Joueurs({
				Nom_joueur: req.body.Nom_joueur,
				Prenom_joueur: req.body.Prenom_joueur,
				Email: req.body.Email,
				Mot_de_passe: hash,
				Date_naissance: req.body.Date_naissance,
				Numero_maillot: req.body.Numero_maillot,
				Poste: req.body.Poste,
			});
			// // Utilisation de la méthode save() pour l'ajout dans Mongodb
			new_joueur
				.save()
				.then(() => resp.json({ status: 200, message: 'Le joueur a été ajouté !' }))
				.catch(error => resp.status(400).json({ error }));
		})
		.catch(error => resp.status(500).json({ error }));
});

module.exports = router;
