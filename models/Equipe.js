const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorieAge: { type: String, required: true },
  joueurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
  matchs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  imageEquipe: { type: String },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' } // Référence au club de l'équipe
});

const Equipe = mongoose.model('Equipe', equipeSchema);

module.exports = Equipe;

