import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { ButtonGroup } from '@material-ui/core';
import { ButtonToolBar } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button>My Goals</Button>{' '}
        <Button>View Progress</Button>{' '}
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>Add Workout</Button>
        <Button>View/Edit Workouts</Button>
      </ButtonGroup>
    </React.Fragment>
  );
}