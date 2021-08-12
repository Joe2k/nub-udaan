const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Class Schema
const ClassSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	waitList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	startTime: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Class = mongoose.model('Class', ClassSchema);
