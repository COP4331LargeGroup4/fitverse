const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    Workout: {
            Name: {
            type: String,
            required: true
            },
        
            StartDate: {
                type: Number,
                required: true
            },
            
          
            TimeHours: Number,
            TimeMinutes: Number,
            Description: String,
            Complete: Boolean
            }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
