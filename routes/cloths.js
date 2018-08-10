var express = require('express');
var fs = require('fs'); 
var mime = require('mime-types');
// const fe = require('file-extension');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;
var Cloth = require('../schemas/cloth');

db.on('error', console.error);
db.once('open', function() {
	console.log('Connected to mongod server');
});

mongoose.connect('mongodb://localhost:27017/potd');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('cloth', { title: 'DataBase Testing' });
});

router.post('/save', function(req, res, next) {
	if(!req.files) return res.status(400).send('No files were uploaded.');
	
	var cloth = new Cloth();
    cloth._id = new mongoose.Types.ObjectId;
    // cloth.shop_id = ;
    cloth.category = req.body.category;
	cloth.name = req.body.name;
	cloth.description = req.body.description;

	var fileIndex = 0;
	var filePath = new Array();

	fs.mkdirSync('resources/clothes/' + String(cloth._id) + '/images');
	for(var i = 0; i<req.files.images.length; ++i) {
			filePath.push('resources/clothes/' + String(cloth._id) + '/images/' + i + '.' + mime.extension(req.files.images[i].mimetype));
			
			req.files.images[i].mv(filePath[i], function(err) {
				if (err) throw err;
				else {
					console.log('Success to save file: ' + filePath[fileIndex]);
					fileIndex++;
				}
			});
	}

	cloth.images = filePath;	
    cloth.cost = req.body.cost;
    cloth.style = req.body.style;
    cloth.size = req.body.size;
	cloth.date = new Date();
	cloth.save();

	res.render('index', { title: 'Saving Complete' });
});

// router.get('/load', function(req, res) {
// 	Cloth.find({}, function(err, result) {
// 		res.write('Name is ' + result[0].name);
// 		res.write('Explanation is ' + result[0].explanation);
// 		res.write('Date is ' + result[0].date);
// 		res.write('Images are ' + new Buffer(result[0].images[0]));
// 		res.write('Lat is ' + result[0].lat);
// 		res.write('Log is ' + result[0].log);
// 		res.end();
// 	});
// });

router.get('/load_all', function(req, res) {
	Cloth.find({}, function(err, result) {
		res.write(JSON.stringify(result));
		res.end();
	});
});

// router.get('/search', function(req, res, next) {
// 	if (req.query.name_shop != null) {
// 		console.log('get in ' + req.query.name_shop);
// 		Shop.find({ name: { $regex: req.query.name_shop } }, function(err, result) {
// 			if (result.toString() == "") { res.write("Not Found"); res.end(); } else {
// 				res.write(JSON.stringify(result));
// 				res.end();
// 			}
// 		});
// 	} else { res.write("Not Found"); res.end(); }
// });

module.exports = router;
