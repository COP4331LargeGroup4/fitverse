const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    Workout: {
            Name: String,
            Month: Number,
            Day: Number,
            TimeOfDay: String,
            Complete: Boolean
            }
})

module.exports = mongoose.model("Workout", WorkoutSchema);
