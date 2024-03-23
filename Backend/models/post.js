const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
});

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;
