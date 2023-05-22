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
exports.createClub = async (req, res) => {
  const { nom, adresse, histoire, joueurId } = req.body;

  let imageClub = '';
  if (req.file) {
    imageClub = req.file.path;
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
    res.status(201).json(nouveauClub);
  } catch (error) {
    console.error('Une erreur est survenue lors de la création du club:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du club.' });
  }
};

// Mettre à jour un club
exports.updateClub = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const club = await Club.findByIdAndUpdate(id, updates, { new: true });
    if (!club) {
      res.status(404).json({ error: 'Club introuvable.' });
    } else {
      res.status(200).json(club);
    }
  } catch (error) {
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
      res.status(200).json({ message: 'Club supprimé avec succès.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du club.' });
  }
};

module.exports = exports;
