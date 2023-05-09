const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const joueursSchema = mongoose.Schema({
	Nom_joueur: { type: String, required: true },
	Prenom_joueur: { type: String, required: true },
	Email: { type: String, required: true },
	Mot_de_passe: { type: String, required: true },
	Date_naissance: { type: Date, required: false, default: '' },
	Numero_maillot: { type: Number, required: false, default: '' },
	Poste: { type: String, required: false, default: '' },
});

joueursSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Joueurs', joueursSchema);
