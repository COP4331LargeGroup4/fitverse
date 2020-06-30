const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    Workout: {
            Name: String,
            Month: Number,
            Day: Number,
            Year: Number,
            TimeHours: Number,
            TimeMinutes: Number,
            AMPM: Boolean,
            Description: String,
            Complete: Boolean
            }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
