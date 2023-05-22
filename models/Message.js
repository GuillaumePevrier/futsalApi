const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  expediteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Joueur', required: true },
  destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Joueur', required: true },
  contenu: { type: String, required: true },
  date: { type: Date, default: Date.now },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },
  convocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Convocation' },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

