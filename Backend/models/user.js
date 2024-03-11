const mongoose = require('mongoose'); // позволяет работать с mongodDB
const bcrypt = require('bcrypt'); // шифрует данные
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

// Функция поиска пользователя по логину
module.exports.getUserByLogin = function (login, callback) {
	const query = { login: login };
	User.findOne(query, callback);
};

// Функция поиска пользователя по id
module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
};

// Функция добавляет пользователя в базу данных
module.exports.addUser = function (newUser, callback) {
	// задаем параметры хэширования
	bcrypt.genSalt(10, function (err, salt) {
		// хэшируем пароль
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

// Функция сравнения паролей пользователя из запроса и из БД
module.exports.comparaPass = function (passFromUser, userDbPass, callback) {
	bcrypt.compare(passFromUser, userDbPass, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
};
