const mongoose = require('mongoose');

const convocationSchema = new mongoose.Schema({
  equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  joueurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
  date: { type: Date, required: true },
  lieu: { type: String, required: true },
  imageConvocation: { type: String }, // Chemin vers l'image de convocation
  commentaire: { type: String },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
});

const Convocation = mongoose.model('Convocation', convocationSchema);

module.exports = Convocation;

