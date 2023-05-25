const Club = require('../models/Club');
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dfyzonzsj",
  api_key: "272913112564242",
  api_secret: "n_0vxgVsNBRG9gnpCnBY9JbSDZA"
});

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
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageClub = result.secure_url;

      // Supprimer le fichier temporaire
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error('Une erreur est survenue lors du téléchargement de l\'image:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors du téléchargement de l\'image.' });
      return;
    }
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

    const imageUrl = `${req.protocol}://${req.get('host')}/${imageClub.replace(/\.(jpg|png)$/, '.webp')}`;
    nouveauClub.imageClub = imageUrl;

    await nouveauClub.save();

    res.status(201).json(nouveauClub);
  } catch (error) {
    console.error('Une erreur est survenue lors de la création du club:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du club.' });
  }
};

const fs = require('fs');


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
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageClub = result.secure_url;

        // Supprimer l'ancienne image
        await cloudinary.uploader.destroy(path.basename(club.imageClub));
        // Supprimer le fichier temporaire
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error("Une erreur est survenue lors du téléchargement de l'image :", error);
        res.status(500).json({ error: "Une erreur est survenue lors du téléchargement de l'image." });
        return;
      }
    }

    club.set(updates);
    club.imageClub = imageClub;

    const updatedClub = await club.save();

    const imageUrl = `${req.protocol}://${req.get('host')}/${imageClub.replace(/\.(jpg|png)$/, '.webp')}`;
    updatedClub.imageClub = imageUrl;

    await updatedClub.save();

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
