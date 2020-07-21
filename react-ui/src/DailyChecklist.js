import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Typography,
  makeStyles,
  List,
  Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WorkoutUtil from './util-api/workout-utl'
import moment from 'moment'

const workoutUtil = new WorkoutUtil();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ExerciseChecklist(props){
  const{workout,classes}=props;
  const [doneExercises, setDoneExercises] = useState([]);
  var currentDate = moment().format("YYYY-MM-DD");
  
  const getExercisesDone = async (workoutId, date) => {
    var doneExercises = await workoutUtil.getDoneExercises(workoutId, date);
    console.log(doneExercises);

    setDoneExercises(doneExercises.doneExercises);
}

const handleToggleDone = (exerciseId) => {
  if (doneExercises && doneExercises.includes(exerciseId)) {
      let newState = [...doneExercises];
      newState = newState.filter(v => v !== exerciseId);
      setDoneExercises(newState);
      workoutUtil.markExercisesDone(
          {
              workout: workout._id,
              date: currentDate,
              removeDoneExercises: [exerciseId]
          }
      )
  }
  else {
      let newState = [...doneExercises];
      newState.push(exerciseId);
      console.log({
        workout: workout._id,
        date: currentDate,
        addDoneExercises: [exerciseId]
    })
      setDoneExercises(newState);
      workoutUtil.markExercisesDone(
          {
              workout: workout._id,
              date: currentDate,
              addDoneExercises: [exerciseId]
          }
      )
  }
}

useEffect(() => {
    getExercisesDone(workout._id, currentDate);
}, []);

  return(
      <List>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  {"Exercises for " + workout.name}
              </Typography>
              {workout.exercises.map((exercise, key) => (
                  <Accordion key={key}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                  >
                      <FormControlLabel
                          aria-label="Acknowledge"
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                          control={
                              <Checkbox 
                                  color='primary' 
                                  checked={doneExercises && doneExercises.includes(exercise._id)}
                                  onClick={function () { handleToggleDone(exercise._id) }}
                              />
                          }
                          label={exercise.name}
                          className={(doneExercises && doneExercises.includes(exercise._id)) ? classes.doneTitle : undefined}
                      />
                  </AccordionSummary>
                  <AccordionDetails>
                      <Typography color="textSecondary">
                          {exercise.notes ? exercise.notes : "This exercise has no notes"}
                      </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
  );
}

export default function DailyChecklist() {
  const classes = useStyles();
  const [workouts, setWorkouts] = useState();
  var currentDate = new Date();

  const initializeList = async () => {
      var workouts = await workoutUtil.getAllWorkoutsInRange(
      {
          startDate: currentDate,
          endDate: currentDate
      })
      var myWorkoutsList = workouts.workouts.map(workout => { // workout is a single workout/index of array
          return workout
      })
      setWorkouts(myWorkoutsList)
  }

  useEffect(() => {
    initializeList();
  }, []);




  return (
    <div>
        {
          workouts ? workouts.map(workout => (            // only if exists 
            <ExerciseChecklist workout={ workout } classes={classes}/>
          ))
          :<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {"No Exercises for Today"}
            </Typography>
        }
    </div>
  );
}