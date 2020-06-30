import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Title from './Title';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ButtonComponents() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Title>Hello</Title>
      <Grid container spacing={3}>
            {/* Chart */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} component={NavLink} exact path to='/goals'>My Workouts</Button>
            </Grid>
            {/* Recent Deposits */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}component={NavLink} exact path to='/goals'>My Exercises</Button>
            </Grid>
            {/* Recent Orders */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleClickOpen}>Add Workout</Button>
        
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a Workout</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can view or edit your workouts by visiting the MyWorkouts page.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
							  name="workoutName"
							  variant="outlined"
							  required
                fullWidth
                type="name"
							  id="workoutName"
							  label="Workout Name"
              />
              <TextField
                name="selectDate"
                variant="outlined"
                margin="dense"
                //required
                fullWidth
                id="selectDate"
                label="Date of Workout"
                autoFocus
						  />
              <TextField
							  name="selectTime"
                variant="outlined"
                margin="dense"
						  	//required
						  	fullWidth
							  id="selectTime"
						  	label="Time of Workout"     //ADD AM-PM DROPDOWN MENU HERE
                autoFocus
						  />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Create Workout
              </Button>
            </DialogActions>
      </Dialog>
            
            </Grid>
            <Grid item lg={6}>
              
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}component={NavLink} exact path to='/goals'>My Goals</Button>
            </Grid>
          </Grid>
        
    </React.Fragment>
  );
}
