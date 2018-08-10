var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	explanation: String,
	images: [String],
	likes: Number,
	style: Number,
	lat: Number,
	log: Number,
	date: Date
});

module.exports = mongoose.model('shop', shopSchema);
