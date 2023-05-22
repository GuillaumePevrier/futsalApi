const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },
  adversaire: { type: String },
  joueursConvoques: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
  presenceJoueurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
  resultat: { type: String },
  commentaires: { type: String },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;

