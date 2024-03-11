const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // позволяет работать с jwt
const config = require('../config/db');
// Роутинг аккаунта
// Когда пользователь будет на странице /reg и отправлять post запрос, т.е. запись данных в запрос объект User, затем addUser добавляет пользователя в базу
router.post('/reg', (req, res) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		login: req.body.login,
		password: req.body.password,
	});

	User.addUser(newUser, (err, user) => {
		if (err) {
			res.json({ success: false, msg: 'User has not been added.' });
		} else {
			res.json({ success: true, msg: 'User has not been added.' });
		}
	});
});

router.post('/auth', (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	// получения пользователя
	User.getUserByLogin(login, (err, user) => {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'This user was not found.' });
		}

		// сравнение полученного пользователя и пользователя из БД
		User.comparePass(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				// устанавливаем токен
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 3600 * 24, // expiresIn задает сколько времени пользователь будет авторизован (здесь сутки)
				});
				res.json({
					sucess: true,
					token: 'JWT' + token,
					user: {
						id: user._id, // _id так записывается обращение в MongoDB
						name: user.name,
						login: user.login,
						email: user.email,
					},
				});
			} else {
				return res.json({ success: false, msg: 'Password mismatch.' });
			}
		});
	});
});

// с помощью passport можно ограничить доступ, если пользователь не авторизован
router.get(
	'/dashboard',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.send('Dashboard page');
	}
);

module.exports = router;
