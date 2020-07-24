import React from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import Title from './Title';

export default function ButtonComponents() {
  const handleWorkoutOpen = () => {
    sessionStorage.setItem('addWorkout', 'true')
    window.location.href = '/calendar';
  };

  const handleExerciseOpen = () => {
    sessionStorage.setItem('addExercise', 'true')
    window.location.href = '/exercises';
  };
  
  return (
    <React.Fragment justifyContent= "center" alignItems= "center">
      <Title></Title>
      <Grid container spacing={3} justify="center">
        <Grid item >
          <Button size="large" variant="contained" color="primary"  fullWidth style={{backgroundColor: '#416164'}} onClick={handleExerciseOpen}>Add Exercise</Button>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained" color="primary"  fullWidth style={{backgroundColor: '#416164'}} onClick={handleWorkoutOpen}>Add Workout</Button>
        </Grid>
      </Grid>   
    </React.Fragment>
  );
}