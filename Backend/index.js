const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Создаем экземпляр приложентя Express
const app = express();

// Общепринято брать 3000
const port = 3000;

// Запуск сервера
app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Main page');
});
