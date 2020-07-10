const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const CompletedExercisesSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	workout: {
		type: String,
		required: true
	},
	exercises: {
		type: [String],
		required: true,
		default: []
	},
	date: {
		type: Date,
		required: true,
	}
});

module.exports = CompletedExercises = mongoose.model('completedExercises', CompletedExercisesSchema);