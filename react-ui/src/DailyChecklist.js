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

const workoutUtil = new WorkoutUtil();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DailyChecklist() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]); // starts it off with a check at index.
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

  const handleCheck = (value) => () => {      // HERE
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      alert("CHECKED");
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    // mark as done or not done here. 
  };

  return (
    <div>
        {
          workouts ? workouts.map(workout => (            // only if exists 
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
                          control={<Checkbox color='primary' />} //<----
                          label={exercise.name}
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
          ))
          :<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {"No Exercises for Today"}
            </Typography>
        }
    </div>
  );
}