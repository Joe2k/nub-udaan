const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	confirmedClasses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Class',
		},
	],
	waitListedClasses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Class',
		},
	],
});

module.exports = User = mongoose.model('User', UserSchema);
