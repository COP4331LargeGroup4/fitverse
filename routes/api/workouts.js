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
      .then(workouts => res.json(workouts))
});

// Need to fix ***

// route POST api/workouts
// description: Create a POST
// access: Public
router.post('/', (req, res) => {
    const WorkoutNew = new Workout({
        Name: req.body.Name
    })
    
    router.post('/', (req, res) => {
    const WorkoutNew = new Workout({
        Month: req.body.Month
    })
    
// Need to fix ***
      
    WorkoutNew.save().then(workouts => res.json(workouts));
});

module.exports = router;
