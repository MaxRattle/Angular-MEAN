const express = require('express');
const router = express.Router(); // Создание экземпляр объекта маршрутизатора Express
const user = require('../models/user'); // Импорт модели User
const bcrypt = require('bcrypt'); // Импорт библиотеки для хещирования паролей
const jwt = require('jsonwebtoken'); // Импорт для аутентификации по jwt токену
const database = require('../config/db'); // Импорт секретного ключа из db

// Роутинг регистрации /account/reg
router.post('/reg', async (req, res) => {
	// Создаем объект по схеме User, в конце body указывается имя формы-отправки
	const data = {
		name: req.body.name,
		email: req.body.email,
		login: req.body.login,
		password: req.body.password,
	};
	// Проверка является ли пользователь уже существующим
	const existingUser = await user.findOne({ name: data.name });

	if (existingUser) {
		res.send('User already exists. Please choose a different username.');
	} else {
		// Хешируем пароль с помощью bcrypt
		const saltRounds = 10; // Число итераций хеширования
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		data.password = hashedPassword; // Заменяем обычный пароль на хешированный

		const userData = await user.insertMany(data);
		console.log(userData);
	}
});

// Роутинг аутентификации /account/auth
router.post('/auth', async (req, res) => {
	// Попытаемся найти пользователя
	try {
		const check = await user.findOne({ email: req.body.email });
		if (!check) {
			return res.status(404).json({ error: 'User email cannot found' });
		}
		// Сравниваем хешированный пароль с БД с "открытым" паролем
		const isPasswordMatch = await bcrypt.compare(
			req.body.password,
			check.password
		);
		if (!isPasswordMatch) {
			return res.status(401).json({ error: 'Wrong password' });
		} else {
			const token = jwt.sign({ id: check._id }, database.secret, {
				expiresIn: '1h',
			});
			return res.json({ token });
		}
	} catch (error) {
		return res.status(500).json({ error: 'Wrong details' });
	}
});

module.exports = router;
