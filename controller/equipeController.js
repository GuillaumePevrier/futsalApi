const Equipe = require('../models/Equipe');

// Récupérer toutes les équipes
exports.getAllEquipes = async (req, res) => {
	try {
		const equipes = await Equipe.find().populate('joueurs matchs club');
		res.status(200).json(equipes);
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des équipes.' });
	}
};

// Récupérer une équipe par son identifiant
exports.getEquipeById = async (req, res) => {
	const { id } = req.params;
	try {
		const equipe = await Equipe.findById(id).populate('joueurs matchs club');
		if (!equipe) {
			res.status(404).json({ error: 'Équipe introuvable.' });
		} else {
			res.status(200).json(equipe);
		}
	} catch (error) {
		res.status(500).json({ error: "Une erreur est survenue lors de la récupération de l'équipe." });
	}
};

// Créer une équipe
exports.createEquipe = async (req, res) => {
	const { nom, categorieAge, joueurs, matchs, imageEquipe, club } = req.body;
	const equipe = new Equipe({ nom, categorieAge, joueurs, matchs, imageEquipe, club });
	try {
		const nouvelleEquipe = await equipe.save();
		res.status(201).json(nouvelleEquipe);
	} catch (error) {
		res.status(500).json({ error: "Une erreur est survenue lors de la création de l'équipe." });
	}
};

// Mettre à jour une équipe
exports.updateEquipe = async (req, res) => {
	const { id } = req.params;
	try {
		const equipe = await Equipe.findByIdAndUpdate(id, req.body, { new: true }).populate('joueurs matchs club');
		if (!equipe) {
			res.status(404).json({ error: 'Équipe introuvable.' });
		} else {
			res.status(200).json(equipe);
		}
	} catch (error) {
		res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'équipe." });
	}
};

// Supprimer une équipe
exports.deleteEquipe = async (req, res) => {
	const { id } = req.params;
	try {
		const equipe = await Equipe.findByIdAndRemove(id).populate('joueurs matchs club');
		if (!equipe) {
			res.status(404).json({ error: 'Équipe introuvable.' });
		} else {
			res.status(200).json({ message: 'Équipe supprimée avec succès.' });
		}
	} catch (error) {
		res.status(500).json({ error: "Une erreur est survenue lors de la suppression de l'équipe." });
	}
};

module.exports = exports;
