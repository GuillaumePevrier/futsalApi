const Match = require('../models/Match');

// Récupérer tous les matchs
exports.getAllMatchs = async (req, res) => {
  try {
    const matchs = await Match.find();
    res.status(200).json(matchs);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des matchs.' });
  }
};

// Récupérer un match par son identifiant
exports.getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findById(id);
    if (!match) {
      res.status(404).json({ error: 'Match introuvable.' });
    } else {
      res.status(200).json(match);
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du match.' });
  }
};

// Créer un match
exports.createMatch = async (req, res) => {
  const { date, equipe, adversaire, joueursConvoques, presenceJoueurs, resultat, commentaires, competition, club } = req.body;
  const match = new Match({ date, equipe, adversaire, joueursConvoques, presenceJoueurs, resultat, commentaires, competition, club });
  try {
    const nouveauMatch = await match.save();
    res.status(201).json(nouveauMatch);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du match.' });
  }
};

// Mettre à jour un match
exports.updateMatch = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const match = await Match.findByIdAndUpdate(id, updates, { new: true });
    if (!match) {
      res.status(404).json({ error: 'Match introuvable.' });
    } else {
      res.status(200).json(match);
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du match.' });
  }
};

// Supprimer un match
exports.deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findByIdAndRemove(id);
    if (!match) {
      res.status(404).json({ error: 'Match introuvable.' });
    } else {
      res.status(200).json({ message: 'Match supprimé avec succès.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du match.' });
  }
};

module.exports = exports;
