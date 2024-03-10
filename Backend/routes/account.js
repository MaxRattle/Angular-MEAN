const express = require('express');
const router = express.Router();

router.get('/reg', (req, res) => {
	res.send('Registration page');
});

router.get('/auth', (req, res) => {
	res.send('Login page');
});

router.get('/dashboard', (req, res) => {
	res.send('Dashboard page');
});

module.exports = router;
