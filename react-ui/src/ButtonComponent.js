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
  FormLabel,
  Switch,
  MenuItem,
  makeStyles,
  Radio,
  RadioGroup,
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ButtonComponents() {
  const classes = useStyles();

  const [workoutOpen, setWorkoutOpen] = React.useState(false);
  const [exerciseOpen, setExerciseOpen] = React.useState(false);

  const [state, setState] = React.useState({
    weekDayMonth: 'week',
  });

  const handleWorkoutOpen = () => {
    setWorkoutOpen(true);
  };

  const handleWorkoutClose = () => {
    setWorkoutOpen(false);
  };

  const handleExerciseOpen = () => {
    setExerciseOpen(true);
  };

  const handleExerciseClose = () => {
    setExerciseOpen(false);
  };

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  const [value, setValue] = React.useState('Cardio');

  const handleRepeatToggle = () => {
    toggleWeekDayPicker(!weekdayPicker);
  }

  const handleChangeRepeatedDay = (event, newSelected) => {
    let newState = Object.assign({}, currentEvent);
    newState.repeat = newSelected;
    setCurrentEvent(newState);
  }

  const [timeAmount, setTimeAmount] = React.useState('');

  const handleChangeSelector = (event) => {
    setTimeAmount(event.target.value);
  };

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
      <Dialog open={workoutOpen} onClose={handleWorkoutClose} aria-labelledby="form-dialog-title">
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
                    label="Start Date"
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
                    label="End Date"
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
            <DialogContentText>Repeat on</DialogContentText>
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
          <Button onClick={handleWorkoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWorkoutClose} color="primary">
            Create Workout
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const AddExerciseDialog = () =>{
    return(
      <Dialog open={exerciseOpen} onClose={handleExerciseClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add an Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            These exercises are also added to the MyExercises page.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="exerciseName"
            variant="outlined"
            required
            fullWidth
            type="name"
            id="exerciseName"
            label="Exercise Name"
          />
          <FormControl component="fieldset">
            <RadioGroup name="exerciseType" value={value} onChange={handleChangeRadio}>
              <Grid container spacing={5}>
                <Grid item>
                  <FormControlLabel value="Cardio" control={<Radio />} label="Cardio"/>
                </Grid>
                <Grid item>
                  <FormControlLabel value="Strength" control={<Radio />} label="Strength" />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          <Container maxWidth="lg" className={classes.container} style={{padding: 0, marginTop: 0}}>
            <Grid container spacing={3}>
            <Grid item>
                <TextField
                  margin="dense"
                  name="time"
                  variant="outlined"
                  fullWidth
                  id="amountTime"
                  label="Time Amount"
                />
              </Grid>   
              <Grid item>
              <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                <InputLabel id="timeUnitLabel">time unit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeAmount}
                  onChange={handleChangeSelector}
                  label="time unit"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>seconds</MenuItem>
                  <MenuItem value={20}>minutes</MenuItem>
                  <MenuItem value={30}>hours</MenuItem>
                </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" className={classes.container} style={{padding: 0}}>
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  margin="dense"
                  name="sets"
                  variant="outlined"
                  fullWidth
                  type="sets"
                  id="numSets"
                  label="# Sets"
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  name="reps"
                  variant="outlined"
                  fullWidth
                  type="reps"
                  id="numReps"
                  label="# Reps"
                />
              </Grid>
           </Grid> 
          </Container>  

          <TextField
            margin="dense"
            name="weights"
            variant="outlined"    
            id="amountWeight"
            label="Weight Amount (lbs)"
          />
          <TextField
            margin="dense"
            marginTop="2"
            name="myNotes"
            variant="outlined"
            fullWidth
            type="goals"
            id="outlined-multiline-static"
            label="My Notes About This Exercise"
            multiline
            rows={4}    
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleExerciseClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleExerciseClose} color="primary">
            Add Exercise
          </Button>
        </DialogActions>
      </Dialog>
    );
  }    

  return (
    <React.Fragment>
      <Title>Hello</Title>
      <Grid container spacing={3}>
        <Grid item lg={6}>
          <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} >My Workouts</Button>
        </Grid>
        <Grid item lg={6}>
          <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleExerciseOpen}>Add Exercises</Button>
          <AddExerciseDialog/>
        </Grid>
        <Grid item lg={6}>
          <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}} onClick={handleWorkoutOpen}>Add Workout</Button>
          <AddWorkoutDialog/>
        </Grid>
        <Grid item lg={6}>    
          <Button size="large" variant="contained" color="primary"  style={{backgroundColor: '#416164'}}>My Goals</Button>
        </Grid>
      </Grid>   
    </React.Fragment>
  );
}
