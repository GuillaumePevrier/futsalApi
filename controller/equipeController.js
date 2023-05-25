const path = require('path');
const fs = require('fs');
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
  const { nom, categorieAge, joueurs, matchs, club } = req.body;

  let imageEquipe = '';
  let fileName = '';

  if (req.file) {
    fileName = req.file.filename;
    const imagePath = path.join('images', fileName);
    req.file.path = imagePath;
    imageEquipe = imagePath;
  }

  const equipe = new Equipe({ nom, categorieAge, joueurs, matchs, imageEquipe, club });

  try {
    const nouvelleEquipe = await equipe.save();

    const imageUrl = `${req.protocol}://${req.get('host')}/${imageEquipe.replace(/\.(jpg|png)$/, '.webp')}`;
    nouvelleEquipe.imageEquipe = imageUrl;

    await nouvelleEquipe.save();

    res.status(201).json(nouvelleEquipe);
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de l'équipe :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la création de l'équipe." });
  }
};

// Mettre à jour une équipe
exports.updateEquipe = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const equipe = await Equipe.findById(id);
    if (!equipe) {
      return res.status(404).json({ error: 'Équipe introuvable.' });
    }

    let imageEquipe = equipe.imageEquipe;
    let fileName = '';

    if (req.file) {
      fileName = req.file.filename;
      const imagePath = path.join('images', fileName);
      req.file.path = imagePath;
      imageEquipe = imagePath;

      if (fs.existsSync(path.join('images', path.basename(equipe.imageEquipe)))) {
        fs.unlinkSync(path.join('images', path.basename(equipe.imageEquipe)));
      }
    }

    equipe.set(updates);
    equipe.imageEquipe = imageEquipe;

    const updatedEquipe = await equipe.save();

    const imageUrl = `${req.protocol}://${req.get('host')}/${imageEquipe.replace(/\.jpg$/, '.webp')}`;

    updatedEquipe.imageEquipe = imageUrl;

    await updatedEquipe.save();

    res.status(200).json(updatedEquipe);
  } catch (error) {
    console.error("Une erreur est survenue lors de la mise à jour de l'équipe :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'équipe." });
  }
};

// Supprimer une équipe
exports.deleteEquipe = async (req, res) => {
  const { id } = req.params;
  try {
    const equipe = await Equipe.findByIdAndRemove(id);
    if (!equipe) {
      res.status(404).json({ error: 'Équipe introuvable.' });
    } else {
      if (fs.existsSync(path.join('images', path.basename(equipe.imageEquipe)))) {
        fs.unlinkSync(path.join('images', path.basename(equipe.imageEquipe)));
      }
      res.status(200).json({ message: 'Équipe supprimée avec succès.' });
    }
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression de l'équipe :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la suppression de l'équipe." });
  }
};

module.exports = exports;
