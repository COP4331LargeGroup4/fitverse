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
import 'date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  depositContext: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function ButtonComponents() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    weekDayMonth: 'week',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };


  const AddWorkoutDialog = () =>{
    return(
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
              id="StartDate"
              label="Select a Start Date"
              type="date"
              required
              margin="dense"
              defaultValue="2020-06-30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
              id="EndDate"
              label="Select an End Date"
              type="date"
              margin="dense"
              defaultValue="2020-06-30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
            id="time"
            label="Time of Day"
            type="time"
            margin="dense"
            defaultValue="07:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
  
        <FormControl className={classes.formControl}>
          <InputLabel shrink  htmlFor="weekDayMonth">Repeat Every</InputLabel>
          <Select
            native
            defaultValue="hi"
            value={state.numAmount}
            onChange={handleChange}
            inputProps={{
              name: 'numAmount',
              id: 'weekDayMonth',
            }}
          >
            <option aria-label="week" value="" />
            <option value={10}>week</option>
            <option value={20}>month</option>
            <option value={30}>year</option>
          </Select>
      </FormControl>
          
          
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
    );
  }

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
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleClickOpen}>My Exercises</Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add a Workout</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You can view or edit your exercises here.
                  </DialogContentText>
                  
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
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleClickOpen}>Add Workout</Button>
            <AddWorkoutDialog/>

      </Grid>
      <Grid item lg={6}>    
        <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}component={NavLink} exact path to='/goals'>My Goals</Button>
        </Grid>
      </Grid>
        
    </React.Fragment>
  );
}
