// app/models/penduModel.js

var mongoose = require('mongoose');

module.exports = mongoose.model('Pendu', {
	word: String,
	found: String,
	miss: Number,
	charSent: []
})