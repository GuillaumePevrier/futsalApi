const { connecter, getConnection } = require('./db/connect');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

const joueurRoutes = require('./routes/joueurRoutes');
const equipeRoutes = require('./routes/equipeRoutes');
const matchRoutes = require('./routes/matchRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const convocationRoutes = require('./routes/convocationRoutes'); 
const entrainementRoutes = require('./routes/entrainementRoutes'); 
const clubRoutes = require('./routes/clubRoutes'); 
const messageRoutes = require('./routes/messageRoutes'); 

const url = 'mongodb+srv://nbfcfutsal:nbfcfutsal123@nbfcfutsal.lyhk8kf.mongodb.net/nbfcfutsal?retryWrites=true&w=majority';

connecter(url);

if (getConnection) {
	app.use(express.json());
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		next();
	});
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use('/api/auth', joueurRoutes);
	app.use('/api/equipes', equipeRoutes);
	app.use('/api/matchs', matchRoutes);
	app.use('/api/competitions', competitionRoutes);
	app.use('/api/convocations', convocationRoutes); 
	app.use('/api/entrainements', entrainementRoutes); 
	app.use('/api/clubs', clubRoutes); 
	app.use('/api/messages', messageRoutes); 
	app.use('/images', express.static(path.join(__dirname, 'images')));

	app.listen(3000, () => {
		console.log('Le serveur a démarré !');
	});
}
