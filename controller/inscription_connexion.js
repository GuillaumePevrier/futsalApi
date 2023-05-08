const bcrypt = require( "bcrypt" );

const { Joueurs } = require( "../models/Joueurs" );

function inscription( req, resp ) {
    console.log( "Inscription d'un nouveau joueur...")
    bcrypt.hash( req.body.Mot_de_passe, 10 )
        
        .then( hash => {
            const new_joueur = new Joueurs({
                Nom_joueur : req.body.Nom_joueur,
                Prenom_joueur : req.body.Prenom_joueur,
                Email : req.body.Email,
                Mot_de_passe : hash,
            });
            // // Utilisation de la méthode save() pour l'ajout dans Mongodb
            new_joueur.save()
                .then(() => resp.status(201).json({ message: 'Le joueur a été créé !'}))
                .catch(error => resp.status(400).json({ error }));
        })
        .catch( error => resp.status( 500 ).json({ error }));
    
}

function connexion( req, resp ) {
    console.log( "Connexion d'un joueur...")
    Joueurs.findOne( { Email : req.body.Email } )
        .then( joueur => {
            if ( !joueur ){
                resp.status(401).json({ status : 401, message : 'Unauthorized' });
            } 
            else{
                bcrypt.compare( req.body.Mot_de_passe, joueur.Mot_de_passe )
                    .then ( validation => {
                        if( !validation ){
                            resp.status(401).json( { status : 401, message : "Mot de passe incorrect !" });        
                        }
                        resp.status(200).json( { status : 200, message : "Joueur connecté!", joueurId :  joueur._id, token : 'TOKEN'})
                });
            }
        });
}
        



module.exports = { inscription, connexion};