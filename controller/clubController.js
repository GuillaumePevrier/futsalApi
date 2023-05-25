const Club = require('../models/Club');

// Récupérer tous les clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des clubs.' });
  }
};

// Récupérer un club par son identifiant
exports.getClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const club = await Club.findById(id);
    if (!club) {
      res.status(404).json({ error: 'Club introuvable.' });
    } else {
      res.status(200).json(club);
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du club.' });
  }
};

// Créer un club
const path = require('path');

exports.createClub = async (req, res) => {
  const { nom, adresse, histoire, joueurId } = req.body;

  let imageClub = '';
  let fileName = '';

  if (req.file) {
    // Génération du nom de fichier unique comme expliqué précédemment

    // Enregistrement de l'image dans le répertoire approprié (par exemple, le dossier "images")
    fileName = req.file.filename;
    const imagePath = path.join('images', fileName);
    req.file.path = imagePath; // Met à jour le chemin d'accès avec le chemin relatif
    imageClub = imagePath;
  }

  const club = new Club({
    nom,
    adresse,
    histoire,
    imageClub,
    joueurId
  });

  try {
    const nouveauClub = await club.save();

    // Récupération de l'URL complète de l'image
    const imageUrl = `${req.protocol}://${req.get('host')}/${imageClub.replace(/\.(jpg|png)$/, '.webp')}`;
    nouveauClub.imageClub = imageUrl; // Met à jour la propriété imageClub avec l'URL complète

    await nouveauClub.save(); // Enregistre à nouveau le club avec l'URL mise à jour

    res.status(201).json(nouveauClub);
  } catch (error) {
    console.error('Une erreur est survenue lors de la création du club:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du club.' });
  }
};

const fs = require('fs');


// Mettre à jour un club
exports.updateClub = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ error: 'Club introuvable.' });
    }

    let imageClub = club.imageClub;
    let fileName = '';

    if (req.file) {
      // Génération du nom de fichier unique comme expliqué précédemment

      // Enregistrement de la nouvelle image dans le répertoire approprié (par exemple, le dossier "images")
      fileName = req.file.filename;
      const imagePath = path.join('images', fileName);
      req.file.path = imagePath; // Met à jour le chemin d'accès avec le chemin relatif
      imageClub = imagePath;

      // Suppression de l'ancienne image
      if (fs.existsSync(path.join('images', path.basename(club.imageClub)))) {
        fs.unlinkSync(path.join('images', path.basename(club.imageClub)));
      }
    }

    club.set(updates);
    club.imageClub = imageClub;

    const updatedClub = await club.save();

    // Récupération de l'URL complète de la nouvelle image
    const imageUrl = `${req.protocol}://${req.get('host')}/${imageClub.replace(/\.jpg$/, '.webp')}`;

    updatedClub.imageClub = imageUrl; // Met à jour la propriété imageClub avec l'URL complète

    await updatedClub.save(); // Enregistre à nouveau le club avec l'URL mise à jour

    res.status(200).json(updatedClub);
  } catch (error) {
    console.error('Une erreur est survenue lors de la mise à jour du club:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du club.' });
  }
};


// Supprimer un club
exports.deleteClub = async (req, res) => {
  const { id } = req.params;
  try {
    const club = await Club.findByIdAndRemove(id);
    if (!club) {
      res.status(404).json({ error: 'Club introuvable.' });
    } else {
      // Supprimer l'image correspondante du dossier "images"
      if (fs.existsSync(path.join('images', path.basename(club.imageClub)))) {
        fs.unlinkSync(path.join('images', path.basename(club.imageClub)));
      }

      res.status(200).json({ message: 'Club supprimé avec succès.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du club.' });
  }
};

module.exports = exports;
