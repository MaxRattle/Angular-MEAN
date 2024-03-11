const express = require('express');
const router = express.Router();
const User = require('../models/user');
// Роутинг аккаунта
router.post('/reg', (req, res) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		login: req.body.login,
		password: req.body.password,
	});
	User.addUser(newUser, (err, user) => {
		if (err) {
			res.json({
				success: false,
				msg: 'User has not been added.',
			});
		} else {
			res.json({
				success: true,
				msg: 'User has not been added.',
			});
		}
	});
});

router.get('/auth', (req, res) => {
	res.send('Login page');
});

router.get('/dashboard', (req, res) => {
	res.send('Dashboard page');
});

module.exports = router;
