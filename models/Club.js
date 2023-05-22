const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String },
  histoire: { type: String },
  imageClub: { type: String },
  joueurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' },
  // Autres caractéristiques spécifiques au club
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
