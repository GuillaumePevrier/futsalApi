const { connecter, getConnection } = require('./db/connect');
var bodyParser = require('body-parser')

//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
const express   = require( 'express' );
// Nous créons un objet de type Express. 
const app       = express();
// On récupère toutes les routes défini
const routes = require("./routes/routes");
const joueurRoutes = require("./routes/inscription_connexion");

// Nous définissons ici les paramètres du serveur.
// var hostname = 'localhost'; 
// var port = 3000; 

//URL de notre base
const url       = "mongodb+srv://nbfcfutsal:nbfcfutsal123@nbfcfutsal.lyhk8kf.mongodb.net/nbfcfutsal?retryWrites=true&w=majority"; 

connecter(url);

if( getConnection ) {
    
    app.use(express.json());
    app.use(bodyParser.urlencoded( { extended: true } ));
    app.use(bodyParser.json())
    
    app.use( "/api", routes);
    app.use( "/api/auth", joueurRoutes);
    
    app.listen(3000, () => {
        console.log("Server has started!")
    })
}
