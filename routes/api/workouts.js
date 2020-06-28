const express = required('express');
const router = express.Router();

// Workout Model
const Workout = require('../../Models/WorkoutReport.js');

// route GET api/workouts
// description: Get all workouts
// access: Public
router.get('/', (req, res) => {
    Workout.find()
      .sort({ Name: -1})
      .then(WorkoutReport => res.json(WorkoutReport))
});
module.exports = router;
