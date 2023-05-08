// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
const mongoose = require('mongoose'); 

var connection = false;

function connecter( url ) {
    // Nous connectons l'API à notre base de données
    mongoose.connect(url);    
    
    var db = mongoose.connection; 
    
    db.on( 'error', console.error.bind( console, 'Erreur lors de la connexion' ) ); 
    db.once( 'open', function (){
        console.log( "Connexion à la base OK" );
        connection = true;
    });
}

function getConnection() {
    return connection;
}

module.exports = { connecter, getConnection };