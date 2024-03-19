const express = require('express'); //импортируем express-фреймворк
const connect = require('./config/connect'); // Импорт настроек базы данных // коннекта
const account = require('./routes/account'); // Импортирт роутинга /account
const bcrypt = require('bcrypt'); // Импорт библиотеки для хеширования пароля
const jwt = require('jsonwebtoken'); // Импорт для аутентификации по jwt токену
const database = require('./config/db'); // Импорт секретного ключа из db
const cors = require('cors'); // Импорт cors, позволяет принимать запросы c Frontend

// Создаем экземпляр приложения Express
const app = express();
const PORT = 3000; // Общепринятый порт сервера

// Разрешаем CORS запросы для всех доменов // пока что так
app.use(cors());

// Middleware для парсинга тела запроса как JSON
app.use(express.json());

// Обработка входящих запросов, которые передают данные в формате x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);
	jwt.verify(token, database.secret, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

// Запуск сервера на PORT
app.listen(PORT, () => {
	console.log(`Server work on ${PORT}. http://localhost:${PORT}/`);
});

// Стартовый GER request для '/'
app.get('/', (req, res) => {
	res.send('Main page');
});

// Если адресс начинаяется с /account, тогда вызывается файл роутинга
app.use('/account', account);

// Применение middleware 'authenticateToken' для защиты маршрутов, требующих аутентификации
app.use('/account/dashboard', authenticateToken, (req, res) => {
	res.status(200).json({
		msg: 'successfull backend dashboard',
	});
});
