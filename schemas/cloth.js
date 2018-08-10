var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clothSchema = new Schema({
    _id: Schema.Types.ObjectId,
    shop_id: Schema.Types.ObjectId,
    category: Number,
	name: String,
	description: String,
	images: [String],
	cost: Number,
	style: Number,
	size: Number,
	date: Date
});

module.exports = mongoose.model('cloth', clothSchema);
