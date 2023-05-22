const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  imageCompetition: { type: String }, // Chemin vers l'image de la compétition
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }], // Référence aux catégories associées
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }], // Référence aux clubs associés
  equipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' }], // Référence aux équipes associées
  joueurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }], // Référence aux joueurs associés
  // Autres champs spécifiques à une compétition
});

module.exports = mongoose.model('Competition', competitionSchema);

