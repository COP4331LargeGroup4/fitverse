import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { green, purple } from '@material-ui/core/colors';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Hello</Title>
      <Grid container spacing={3}>
            {/* Chart */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} block>My Goals</Button>
            </Grid>
            {/* Recent Deposits */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}>View Progress</Button>
            </Grid>
            {/* Recent Orders */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}>Add Workout</Button>
            </Grid>
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}>View / Edit Workouts</Button>
            </Grid>
          </Grid>
        
    </React.Fragment>
  );
}