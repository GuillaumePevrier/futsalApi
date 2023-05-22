const Entrainement = require('../models/Entrainement');

// Récupérer tous les entraînements
exports.getAllEntrainements = (req, res) => {
  Entrainement.find()
    .populate('equipe', 'nom')
    .populate('joueursPresent', 'nom prenom')
    .exec((err, entrainements) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(entrainements);
    });
};

// Récupérer un entraînement par son identifiant
exports.getEntrainementById = (req, res) => {
  const entrainementId = req.params.id;
  Entrainement.findById(entrainementId)
    .populate('equipe', 'nom')
    .populate('joueursPresent', 'nom prenom')
    .exec((err, entrainement) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!entrainement) {
        return res.status(404).json({ message: "Entraînement non trouvé" });
      }
      res.status(200).json(entrainement);
    });
};

// Créer un nouvel entraînement
exports.createEntrainement = async (req, res) => {
  const { date, equipe, joueursPresent, commentaires } = req.body;
  const nouvelEntrainement = new Entrainement({
    date,
    equipe,
    joueursPresent,
    commentaires,
  });

  try {
    const entrainement = await nouvelEntrainement.save();
    res.status(201).json(entrainement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Mettre à jour un entraînement
exports.updateEntrainement = async (req, res) => {
  const { id } = req.params;
  const { date, equipe, joueursPresent, commentaires } = req.body;

  try {
    const entrainement = await Entrainement.findByIdAndUpdate(id, {
      date,
      equipe,
      joueursPresent,
      commentaires,
    });

    res.status(200).json(entrainement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Supprimer un entraînement
exports.deleteEntrainement = (req, res) => {
  const entrainementId = req.params.id;
  Entrainement.findByIdAndRemove(entrainementId, (err, entrainement) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!entrainement) {
      return res.status(404).json({ message: "Entraînement non trouvé" });
    }
    res.status(200).json({ message: "Entraînement supprimé avec succès" });
  });
};
