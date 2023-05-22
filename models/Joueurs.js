const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const joueurSchema = mongoose.Schema({
	Nom_joueur: { type: String, required: true },
	Prenom_joueur: { type: String, required: true },
	Email: { type: String, required: true, unique: true },
	Mot_de_passe: { type: String, required: true },
	Date_naissance: { type: Date, default: '' },
	Numero_maillot: { type: Number, default: '' },
	Poste: { type: String, default: '' },
	equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },
	entrainements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entrainement' }],
	matchs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
	nombreLavageMaillots: { type: Number, default: 0 },
	competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
	imageProfil: { type: String }, // Chemin d'accès à l'image de profil
	statistiquesPerformances: {
		type: {
			buts: { type: Number, default: 0 },
			passesDecisives: { type: Number, default: 0 },
			cartonsJaunes: { type: Number, default: 0 },
			cartonsRouges: { type: Number, default: 0 },
		},
		default: {},
	},
	caracteristiquesPhysiques: {
		type: {
			taille: { type: Number, default: 0 },
			poids: { type: Number, default: 0 },
			vitesse: { type: Number, default: 0 },
			endurance: { type: Number, default: 0 },
		},
		default: {},
	},
});

joueurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Joueur', joueurSchema);
