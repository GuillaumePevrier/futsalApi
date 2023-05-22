const Joueur = require('../models/joueurs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Récupérer tous les joueurs
exports.getAllJoueurs = async (req, res) => {
	try {
		const joueurs = await Joueur.find();
		res.status(200).json(joueurs);
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des joueurs.' });
	}
};

// Récupérer un joueur par son identifiant
exports.getJoueurById = async (req, res) => {
	const { id } = req.params;
	try {
		const joueur = await Joueur.findById(id);
		if (!joueur) {
			res.status(404).json({ error: 'Joueur introuvable.' });
		} else {
			res.status(200).json(joueur);
		}
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du joueur.' });
	}
};

// Créer un joueur
exports.createJoueur = async (req, res) => {
	const { Nom_joueur, Prenom_joueur, Email, Mot_de_passe, Date_naissance, Numero_maillot, Poste } = req.body;
	try {
		const existingJoueur = await Joueur.findOne({ Email });
		if (existingJoueur) {
			return res.status(409).json({ error: 'Un joueur avec cette adresse e-mail existe déjà.' });
		}

		const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

		const joueur = new Joueur({
			Nom_joueur,
			Prenom_joueur,
			Email,
			Mot_de_passe: hashedPassword,
			Date_naissance,
			Numero_maillot,
			Poste,
			equipe: null,
			entrainements: [],
			matchs: [],
			nombreLavageMaillots: 0,
			competition: null,
			imageProfil: '',
			statistiquesPerformances: {
				buts: 0,
				passesDecisives: 0,
				cartonsJaunes: 0,
				cartonsRouges: 0,
			},
			caracteristiquesPhysiques: {
				taille: 0,
				poids: 0,
				vitesse: 0,
				endurance: 0,
			},
		});

		const savedJoueur = await joueur.save();

		const token = jwt.sign({ joueurId: savedJoueur._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });

		res.status(201).json({
			message: 'Le joueur a été créé avec succès.',
			token: token,
			joueurId: savedJoueur._id,
		});
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la création du joueur.' });
	}
};

// Mettre à jour un joueur
exports.updateJoueur = async (req, res) => {
	const { id } = req.params;
	try {
		const joueur = await Joueur.findById(id);
		if (!joueur) {
			res.status(404).json({ error: 'Joueur introuvable.' });
		} else {
			// Mettre à jour les champs spécifiques du joueur
			joueur.Nom_joueur = req.body.Nom_joueur || joueur.Nom_joueur;
			joueur.Prenom_joueur = req.body.Prenom_joueur || joueur.Prenom_joueur;
			joueur.Email = req.body.Email || joueur.Email;
			joueur.Date_naissance = req.body.Date_naissance || joueur.Date_naissance;
			joueur.Numero_maillot = req.body.Numero_maillot || joueur.Numero_maillot;
			joueur.Poste = req.body.Poste || joueur.Poste;
			joueur.equipe = req.body.equipe || joueur.equipe;
			joueur.entrainements = req.body.entrainements || joueur.entrainements;
			joueur.matchs = req.body.matchs || joueur.matchs;
			joueur.nombreLavageMaillots = req.body.nombreLavageMaillots || joueur.nombreLavageMaillots;
			joueur.competition = req.body.competition || joueur.competition;
			joueur.imageProfil = req.body.imageProfil || joueur.imageProfil;
			joueur.statistiquesPerformances = req.body.statistiquesPerformances || joueur.statistiquesPerformances;
			joueur.caracteristiquesPhysiques = req.body.caracteristiquesPhysiques || joueur.caracteristiquesPhysiques;

			// Sauvegarder les modifications du joueur dans la base de données
			const updatedJoueur = await joueur.save();
			res.status(200).json(updatedJoueur);
		}
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du joueur.' });
	}
};

// Supprimer un joueur
exports.deleteJoueur = async (req, res) => {
	const { id } = req.params;
	try {
		const joueur = await Joueur.findByIdAndRemove(id);
		if (!joueur) {
			res.status(404).json({ error: 'Joueur introuvable.' });
		} else {
			res.status(200).json({ message: 'Joueur supprimé avec succès.' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du joueur.' });
	}
};

// Connexion d'un joueur
exports.connexion = async (req, res) => {
	console.log("Connexion d'un joueur...");
	const { Email, Mot_de_passe } = req.body;
	try {
		const joueur = await Joueur.findOne({ Email });
		if (!joueur) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}
		const passwordMatch = await bcrypt.compare(Mot_de_passe, joueur.Mot_de_passe);
		if (!passwordMatch) {
			return res.status(401).json({ error: 'Mot de passe incorrect !' });
		}
		const token = jwt.sign({ joueurId: joueur._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
		res.status(200).json({
			joueurId: joueur._id,
			token: token,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};
