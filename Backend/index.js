// Импорт библиотек из зависимостей
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Импорт настроек базы данных
const config = require('./config/db');

// Создаем экземпляр приложения Express
const app = express();

// Общепринято брать 3000
const port = 3000;

// Подключение к базе данных
mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
	console.log('Successfull connection to the database');
});

mongoose.connection.on('error', err => {
	console.log('Not successfull connection to the database');
});

// Запуск сервера
app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Main page');
});
