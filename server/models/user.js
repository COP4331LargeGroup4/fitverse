const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	emailVerified:{
		type: Boolean,
		required: true
	},
	passwordResetToken:{
		type: String,
		required: false
	},
	passwordResetTokenExp:{
		type: Number,
		required: false
	},
	emailVerificationToken:{
		type: String,
		required: false
	},
	emailVerificationTokenExp:{
		type: Number,
		required: false
	}
});

module.exports = mongoose.model('user', UserSchema);
