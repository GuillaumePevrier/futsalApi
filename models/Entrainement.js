const mongoose = require('mongoose');

const entrainementSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },
	joueursPresent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
	commentaires: { type: String },
});

const Entrainement = mongoose.model('Entrainement', entrainementSchema);

module.exports = Entrainement;
