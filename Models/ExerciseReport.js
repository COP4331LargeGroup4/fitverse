const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    Exercise: {
            Name: String,
            TimeDuration: Number,
            Sets: Number,
            Reps: Number,
	    Weight: Number,
	    Description: String,
            Complete: Boolean
            }
})

module.exports = mongoose.model("Workout", ExerciseSchema);