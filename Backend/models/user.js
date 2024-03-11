const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/db');

// Создаем схему пользователя
const UserSchema = mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true, // задает, что поле - обязательно
	},
	login: {
		type: String,
		required: true, // задает, что поле - обязательно
	},
	password: {
		type: String,
		required: true, // задает, что поле - обязательно
	},
});

// Создаем объект пользователя
const User = (module.exports = mongoose.model('User', UserSchema));

module.exports.getUserByLogin = function (login, callback) {
	const query = { login: login };
	User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
	User.findId(id, callback);
};

module.exports.addUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};
