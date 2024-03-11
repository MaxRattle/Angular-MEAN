// Импорт библиотек из зависимостей
const express = require('express');
const cors = require('cors'); // позволяет обрабатывать HTTP-заголовки CORS (механизмы безопасности), по сути дает права на доступ/ограничения в ответе на запрос
const bodyParser = require('body-parser'); // парсит данные с запроса (req) в удобном формате
const mongoose = require('mongoose'); // позволяет работать mongoDB
const passport = require('passport'); // задает параметры авторизации
const path = require('path'); // модуль файловой системы
const bcrypt = require('bcrypt'); // шифрует данные

// Начались проблемы с совместимостью
const session = require('express-session'); // позволяет управлять сессиями в Express, раннее было по умолчанию в пакете Express

// Импорт настроек базы данных
const config = require('./config/db');

// Импортируем вынесенынй роутинг
const account = require('./routes/account');

// Создаем экземпляр приложения Express
const app = express();

// Общепринято брать 3000
const port = 3000;

// Инициализируем passport
app.use(
	session({
		secret: config.secret,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.session());
app.use(passport.initialize());

// Импортируем функционал авторизации
require('./config/passport')(passport);

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
