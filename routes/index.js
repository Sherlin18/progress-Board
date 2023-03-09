var express = require('express');
var router = express.Router();
var Widgets = require('../models/widgets');


router.get('/', function (req, res, next) {

	Widgets.find().select(['-_id', '-__v']).then(function (widgets) {
		res.render('index', { widgets: widgets });
	});

});

router.post('/submit', function (req, res) {

	var data = {
		name: req.body.name,
		information: req.body.information,
		planning: req.body.planning,
		design: req.body.design,
		development: req.body.development,
		testing: req.body.testing,
		launch: req.body.launch
	};

	var id = req.body.id;
	// var id = req.body.id == '' ? 0 : req.body.id;

	if (id == '') {
		Widgets.create(data).then(function () {
			res.redirect('/');
		});
	} else {
		Widgets.updateOne({ id: id }, data).then(function () {
			res.redirect('/');
		});
	}

});

router.post('/remove', function (req, res) {

	Widgets.deleteOne({ id: req.body.id }).then(function () {

		res.redirect('/');
	});
});



module.exports = router;