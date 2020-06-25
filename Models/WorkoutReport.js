const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    Workout: {
            Day_of_week: Array,
            Sets: Number,
            Reps: Number,
            Time: Number,
            Complete: Boolean
            }
})

module.exports = mongoose.model("Workout", WorkoutSchema);