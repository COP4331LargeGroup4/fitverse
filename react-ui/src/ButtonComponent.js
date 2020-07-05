import React, { useState, useEffect } from 'react';
import {
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Select,
  ListSubheader,
  IconButton,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  makeStyles,
} from '@material-ui/core';
import Title from './Title';
import 'date-fns';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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

  const handleRepeatToggle = () => {
    toggleWeekDayPicker(!weekdayPicker);
  }

  const handleChangeRepeatedDay = (event, newSelected) => {
    let newState = Object.assign({}, currentEvent);
    newState.repeat = newSelected;
    setCurrentEvent(newState);
  }

  const [currentEvent, setCurrentEvent] = useState(
  {
    title: '',
    startDate: '',
    endDate: '',
    repeat: []
  });

  const [weekdayPicker, toggleWeekDayPicker] = useState(false);

  const DayPicker = () => {
    var daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
        <ToggleButtonGroup value={currentEvent.repeat} onChange={handleChangeRepeatedDay}>
            {daysOfWeek.map((day, key) => (
                <ToggleButton
                    key={key}
                    value={key}
                >
                    {day}
                </ToggleButton>

            ))}
        </ToggleButtonGroup>
    )
}

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
          <Container maxWidth="lg" className={classes.container} style={{padding: 0, marginTop: 5}}>
            <Grid container spacing={3}>
              <Grid item>
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
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </Container>
          <FormControlLabel
            style={{ marginLeft: 0 }}
            control={<Switch color="primary" onChange={handleRepeatToggle} checked={weekdayPicker} />}
            labelPlacement="start"
            label="Repeat weekly"
          />
            
          {weekdayPicker &&
          <div>
            <DayPicker />
          </div>
          }
          <TextField
            margin="dense"
            marginTop="2"
            name="myGoals"
            variant="outlined"
            fullWidth
            type="goals"
            id="outlined-multiline-static"
            label="My Goals for this Workout"
            multiline
            rows={4}    
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
    );
  }

  return (
    <React.Fragment>
      <Title>Hello</Title>
      <Grid container spacing={3}>
            {/* Chart */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} >My Workouts</Button>
            </Grid>
            {/* Recent Deposits */}
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleClickOpen}>My Exercises</Button>
            </Grid>
            <Grid item lg={6}>
            <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleClickOpen}>Add Workout</Button>
            <AddWorkoutDialog/>

      </Grid>
      <Grid item lg={6}>    
        <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}>My Goals</Button>
        </Grid>
      </Grid>
        
    </React.Fragment>
  );
}
