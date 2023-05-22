const Message = require('../models/Message');

// Méthode pour créer un nouveau message
exports.creerMessage = async (req, res) => {
  try {
    const { expediteur, destinataire, contenu, club, equipe, convocation } = req.body;
    const message = new Message({
      expediteur,
      destinataire,
      contenu,
      club,
      equipe,
      convocation,
    });
    const nouveauMessage = await message.save();
    res.status(201).json(nouveauMessage);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du message.' });
  }
};

// Méthode pour récupérer tous les messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('expediteur destinataire club equipe convocation');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages.' });
  }
};

// Méthode pour récupérer un message par son identifiant
exports.getMessageById = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findById(messageId).populate('expediteur destinataire club equipe convocation');
    if (!message) {
      res.status(404).json({ message: 'Message non trouvé.' });
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du message.' });
  }
};

// Méthode pour mettre à jour un message
exports.updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { expediteur, destinataire, contenu, club, equipe, convocation } = req.body;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { expediteur, destinataire, contenu, club, equipe, convocation },
      { new: true }
    );
    if (!message) {
      res.status(404).json({ message: 'Message non trouvé.' });
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du message.' });
  }
};

// Méthode pour supprimer un message
exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findByIdAndRemove(messageId);
    if (!message) {
      res.status(404).json({ message: 'Message non trouvé.' });
    } else {
      res.status(200).json({ message: 'Le message a été supprimé avec succès.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du message.' });
  }
};
