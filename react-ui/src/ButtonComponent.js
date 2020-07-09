import React, { useState } from 'react';
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
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  MenuItem,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import Title from './Title';
import 'date-fns';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MaterialTable, { MTableToolbar, MTablePagination } from 'material-table';

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

  const [workoutOpen, setWorkoutOpen] = React.useState(false);
  const handleWorkoutOpen = () => {
    setWorkoutOpen(true);
  };
  const handleWorkoutClose = () => {
    setWorkoutOpen(false);
  };

  const [exerciseOpen, setExerciseOpen] = React.useState(false);
  const handleExerciseOpen = () => {
    setExerciseOpen(true);
  };
  const handleExerciseClose = () => {
    setExerciseOpen(false);
  };

  const [value, setValue] = React.useState('Cardio');
  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
 
  const [timeAmount, setTimeAmount] = React.useState('');
  const handleTimeUnitSelector = (event) => {
    setTimeAmount(event.target.value);
  };

  // Muhamad's buttons
  const [weekdayPicker, toggleWeekDayPicker] = useState(false);
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

  const [addExercises, toggleOpenAddEx] = useState(false);
  const handleAddExerciseToggle = () => {
    toggleOpenAddEx(!addExercises);
  }

  const [tableState, setTableState] = React.useState({
    columns: [
      { title: 'Exercises', field: 'exercise' },
    ],
    data: [
      { exercise: 'Pushups'},
      { exercise: 'Sit-Ups'},
    ],
  });

  const AddTable = () =>{
    return(
      <MaterialTable
          components={{
            Toolbar: props => (
                <div style={{ backgroundColor: '#d0cdd7' }}>
                    <MTableToolbar {...props} />
                </div>
            ),
              Pagination: props => (
                <div style={{ backgroundColor: '#d0cdd7' }}>
                    <MTablePagination {...props} />
                </div>
            ), 
          }}
          options={{
            search: false
          }}
          icons={{
            Add: () => <AddCircleIcon/>,
            Edit: () => <EditIcon/>,
            Check: () => <CheckIcon/>,
            Clear: () => <ClearIcon/>,
            SortArrow:() => <ImportExportIcon/>,
            NextPage:() => <NavigateNextIcon/>,
            PreviousPage:() => <NavigateBeforeIcon/>,
            FirstPage: () => <FirstPageIcon/>,
            LastPage:()=> <LastPageIcon/>,
          }}
      title="Exercises"
      columns={tableState.columns}
      data={tableState.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => { // THIS WILL BE A SEARCH
            setTimeout(() => {
              resolve();
              setTableState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setTableState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
          // We don't want delete
        /*onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setTableState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),*/
      }}
    />
    );
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

         <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            fullWidth //maybe
            style={{
              backgroundColor: '#416164', 
            }}
            endIcon={<AddIcon>Add Exercise</AddIcon>}
            onClick={handleAddExerciseToggle} //here
          >
          Add Exercise
        </Button>
  
          {addExercises &&
          <div>
            <DialogContentText></DialogContentText>
            <AddTable />
          </div>
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleWorkoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWorkoutClose} color="primary"> {/* LINK BUTTON */}
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
                  onChange={handleTimeUnitSelector}
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
          <Button onClick={handleExerciseClose} color="primary">{/* LINK BUTTON */}
            Add Exercise 
          </Button>
        </DialogActions>
      </Dialog>
    );
  }    

  return (
    <React.Fragment justifyContent= "center" alignItems= "center">
      <Title></Title>
      <Grid container spacing={3} justify="center">
        <Grid item >
          <Button size="large" variant="contained" color="primary"  fullWidth style={{backgroundColor: '#416164'}} onClick={handleExerciseOpen}>Add Exercise</Button>
          <AddExerciseDialog/>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained" color="primary"  fullWidth style={{backgroundColor: '#416164'}} onClick={handleWorkoutOpen}>Add Workout</Button>
          <AddWorkoutDialog/>
        </Grid>
      </Grid>   
    </React.Fragment>
  );
}


