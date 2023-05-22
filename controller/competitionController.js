const Competition = require('../models/competition');

// Récupérer toutes les compétitions
exports.getAllCompetitions = async (req, res) => {
	try {
		const competitions = await Competition.find();
		res.status(200).json(competitions);
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des compétitions.' });
	}
};

// Récupérer une compétition par son identifiant
exports.getCompetitionById = async (req, res) => {
	const { id } = req.params;
	try {
		const competition = await Competition.findById(id);
		if (!competition) {
			res.status(404).json({ error: 'Compétition introuvable.' });
		} else {
			res.status(200).json(competition);
		}
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la compétition.' });
	}
};

// Créer une compétition
exports.createCompetition = async (req, res) => {
	const { nom, type, dateDebut, dateFin } = req.body;
	const competition = new Competition({ nom, type, dateDebut, dateFin });
	try {
		const nouvelleCompetition = await competition.save();
		res.status(201).json(nouvelleCompetition);
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la création de la compétition.' });
	}
};

// Mettre à jour une compétition
exports.updateCompetition = async (req, res) => {
	const { id } = req.params;
	try {
		const competition = await Competition.findByIdAndUpdate(id, req.body, { new: true });
		if (!competition) {
			res.status(404).json({ error: 'Compétition introuvable.' });
		} else {
			res.status(200).json(competition);
		}
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la compétition.' });
	}
};

// Supprimer une compétition
exports.deleteCompetition = async (req, res) => {
	const { id } = req.params;
	try {
		const competition = await Competition.findByIdAndRemove(id);
		if (!competition) {
			res.status(404).json({ error: 'Compétition introuvable.' });
		} else {
			res.status(200).json({ message: 'Compétition supprimée avec succès.' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la compétition.' });
	}
};

module.exports = exports;
