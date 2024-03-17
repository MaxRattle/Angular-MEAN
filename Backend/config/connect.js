const mongoose = require('mongoose');
const database = require('./db');

mongoose
	.connect(database.db)
	.then(() => {
		console.log('Connected successfully');
	})
	.catch(err => {
		console.log(`Connected with ${err}`);
	});

module.exports = mongoose;
