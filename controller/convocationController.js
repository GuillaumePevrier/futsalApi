const Convocation = require('../models/Convocation');

// Méthode pour créer une convocation
exports.createConvocation = (req, res) => {
  const { equipe, match, joueurs, date, lieu, imageConvocation, commentaire, club } = req.body;

  const convocation = new Convocation({
    equipe,
    match,
    joueurs,
    date,
    lieu,
    imageConvocation,
    commentaire,
    club
  });

  convocation.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Méthode pour obtenir toutes les convocations
exports.getAllConvocations = (req, res) => {
  Convocation.find()
    .populate('equipe')
    .populate('match')
    .populate('joueurs')
    .populate('club')
    .then((convocations) => {
      res.status(200).json(convocations);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Méthode pour obtenir une convocation par son ID
exports.getConvocationById = (req, res) => {
  const convocationId = req.params.id;

  Convocation.findById(convocationId)
    .populate('equipe')
    .populate('match')
    .populate('joueurs')
    .populate('club')
    .then((convocation) => {
      if (!convocation) {
        res.status(404).json({ message: 'Convocation not found' });
      } else {
        res.status(200).json(convocation);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Méthode pour mettre à jour une convocation
exports.updateConvocation = (req, res) => {
  const convocationId = req.params.id;
  const updatedConvocation = req.body;

  Convocation.findByIdAndUpdate(convocationId, updatedConvocation, { new: true })
    .populate('equipe')
    .populate('match')
    .populate('joueurs')
    .populate('club')
    .then((convocation) => {
      if (!convocation) {
        res.status(404).json({ message: 'Convocation not found' });
      } else {
        res.status(200).json(convocation);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Méthode pour supprimer une convocation
exports.deleteConvocation = (req, res) => {
  const convocationId = req.params.id;

  Convocation.findByIdAndRemove(convocationId)
    .then((convocation) => {
      if (!convocation) {
        res.status(404).json({ message: 'Convocation not found' });
      } else {
        res.status(200).json({ message: 'Convocation deleted' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
