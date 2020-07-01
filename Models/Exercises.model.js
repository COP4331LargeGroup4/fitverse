const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    Exercise: {
            Name: String,
            TimeHours: Number,
	    TimeMinutes: Number,
	    TimeSeconds: Number,
            Sets: Number,
            Reps: Number,
	    Weight: Number,
	    Description: String,
            Complete: Boolean
            }
})

module.exports = mongoose.model("Exercise", ExerciseSchema);
