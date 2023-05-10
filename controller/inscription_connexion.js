const bcrypt = require('bcrypt');
const Joueurs = require('../models/Joueurs');
const jwt = require('jsonwebtoken');

exports.inscription = (req, res, next) => {
	console.log("Inscription d'un nouveau joueur...");
	bcrypt
		.hash(req.body.Mot_de_passe, 10)
		.then(hash => {
			const new_joueur = new Joueurs({
				Nom_joueur: req.body.Nom_joueur,
				Prenom_joueur: req.body.Prenom_joueur,
				Email: req.body.Email,
				Mot_de_passe: hash,
				Date_naissance: req.body.Date_naissance,
				Numero_maillot: req.body.Numero_maillot,
				Poste: req.body.Poste,
			});
			// // Utilisation de la méthode save() pour l'ajout dans Mongodb
			new_joueur
				.save()
				.then(() => res.status(201).json({ message: 'Le joueur a été créé !' }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.connexion = (req, res, next) => {
	console.log("Connexion d'un joueur...");
	Joueurs.findOne({ Email: req.body.Email })
		.then(joueur => {
			if (!joueur) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
			}
			const passwordMatch = bcrypt.compareSync(req.body.Mot_de_passe, joueur.Mot_de_passe);
			if (!passwordMatch) {
				return res.status(401).json({ error: 'Mot de passe incorrect !' });
			}
			const token = jwt.sign({ joueurId: joueur._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
			res.status(200).json({
				joueurId: joueur._id,
				token: token,
			});
		})
		.catch(error => res.status(500).json({ error }));
};

// exports.connexion = (req, res, next) => {
//    Joueurs.findOne({ Email: req.body.Email })
//        .then(joueur => {
//            if (!joueur) {
//                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//            }
//            bcrypt.compare(req.body.Mot_de_passe, joueur.Mot_de_passe)
//                .then(valid => {
//                    if (!valid) {
//                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
//                    }
//                    res.status(200).json({
//                        joueurId: user._id,
//                        token: jwt.sign(
//                            { userId: joueur._id },
//                            'RANDOM_TOKEN_SECRET',
//                            { expiresIn: '24h' }
//                        )
//                    });
//                })
//                .catch(error => res.status(500).json({ error }));
//        })
//        .catch(error => res.status(500).json({ error }));
// };
