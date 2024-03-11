// Импорт библиотек из зависимостей
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bcrypt = require('bcrypt');

// Импорт настроек базы данных
const config = require('./config/db');

// Импортируем вынесенынй роутинг
const account = require('./routes/account');

// Создаем экземпляр приложения Express
const app = express();

// Общепринято брать 3000
const port = 3000;

// Добавляет cors
app.use(cors());

// Добавляем body-parser
app.use(bodyParser.json());

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

// Если адресс начинаяется с /account, тогда вызывается файл роутинга
app.use('/account', account);
