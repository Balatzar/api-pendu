// app/routes/penduRoutes.js

var Pendu = require('../models/penduModel.js');

module.exports = function(app) {

	var images = [
	"http://i.imgur.com/o4UvoOV.png",
	"http://i.imgur.com/OhBapeI.png",
	"http://i.imgur.com/oj1iIja.png",
	"http://i.imgur.com/dVoZr3Y.png",
	"http://i.imgur.com/lBXS0Up.png",
	"http://i.imgur.com/DT6yreT.png",
	"http://i.imgur.com/rYTMs3r.png",
	"http://i.imgur.com/Y3VNZfk.png",
	"http://i.imgur.com/kfU5J0g.png",
	"http://i.imgur.com/cpg1psY.png"
	]

	// create a pendu
	app.post('/api/pendu', function(req, res) {
		var data = {};
		if (!req.body.word) {
			data.code = 2;
			res.json(data);
		}
		var found = "";
		for (var i = 0; i < req.body.word.length; i++)
			found += '_';
		Pendu.create({
			word: req.body.word,
			found: found,
			miss: 0
		}, function(err, pendu) {
			if (err)
				res.send(err);
			data.id = pendu._id;
			data.found = pendu.found;
			res.json(data);
		});
	});

	// play
	app.post('/api/pendu/:id', function(req, res) {
		var data = {};
		Pendu.findOne({
			_id: req.params.id
		}, function(err, pendu) {
			data.miss = pendu.miss;
			data.found = pendu.found;
			data.image = images[pendu.miss];
			if (!req.body.char || req.body.char.length != 1)
				data.code = 2;
			if (pendu.charSent.indexOf(req.body.char) != -1)
				data.code = 5;
			if (pendu.miss == 10)
				data.code = 3;
			if (data.code)
				return res.json(data);
			var winGame = true;
			var winRound = false;
			var found = "";
			for (var i = 0; i < pendu.word.length; ++i) {
				if (pendu.word[i] == req.body.char) {
					found += req.body.char;
					winRound = true;
				} else {
					found += pendu.found[i];
				}
				if (found[i] == '_')
					winGame = false;
			}
			if (!winRound) {
				Pendu.findByIdAndUpdate(
					pendu._id,
					{$inc: {miss: 1},
					$push: {charSent: req.body.char}},
					function(){})
				data.code = 6;
				data.miss++;
			} else {
				console.log(pendu._id)
				Pendu.findByIdAndUpdate(
					pendu._id,
					{found: found,
					$push: {charSent: req.body.char}},
					function(){})
				data.code = 1;
				data.found = found;
			}
			if (winGame) {
				data.code = 4;
				data.found = found;
			}
			res.json(data);
		})
	})
}
