const config = require('./db');
const packagaName = require('../models/user');

// Взято из документации по passport.js/passport-jwt.js
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
	var opts = {}; // объект содержащий опции авторизации
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // указываем тип авторизации (в нашем случае по умолчанию - через токен)
	opts.secretOrKey = config.secret; // секретный ключ опций авторизации
	// Для локальных серверов эти опции не нужны
	// opts.issuer = 'accounts.examplesoft.com';
	// opts.audience = 'yoursite.net';
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done) {
			// jwt_payload - это тот объекты (пользователь), который пытается авторизоваться
			User.findOne({ id: jwt_payload.sub }, function (err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
					// or you could create a new account
				}
			});
		})
	);
};
