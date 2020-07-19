import 'date-fns';
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Switch,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    Typography,
    Tabs,
    Tab,
    Input,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Paper,
    Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AlarmIcon from '@material-ui/icons/Alarm';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import { useStyles } from './Navigation'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { ToggleButton, ToggleButtonGroup, Autocomplete } from '@material-ui/lab'
import WorkoutUtil from './util-api/workout-utl'
import MaterialTable, { MTableToolbar, MTablePagination, MTableCell } from 'material-table';
import _ from 'underscore';

const workoutUtil = new WorkoutUtil();

function ControllableDropdown(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [selectedExercise, setSelectedExercise] = useState(props.exercise);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined
        }

        (async () => {
            const exercises = await workoutUtil.getAllExercises();

            if (active) {
                // var available = _.filter(exercises.exercises, function (obj) { return !_.findWhere(props.workout.exercises, { _id: obj._id }); });
                var available = exercises.exercises;

                // if(Object.keys(props.exercise).length !== 0)
                //     available.push(props.exercise);

                console.log(available)
                setOptions(available);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event, newValue) => {
                console.log(newValue)
                if (newValue) {
                    setSelectedExercise(newValue);
                    const newData = [...props.rows];
                    newData[props.index] = newValue;
                    props.setRows(newData);
                    let newState = Object.assign({}, props.workout);
                    newState.exercises = newData;
                    props.setWorkout(newState);
                }
            }}
            value={Object.keys(selectedExercise).length !== 0 ? selectedExercise : undefined}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            style={{ width: 200 }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="Select an exercise"
                    margin="normal"
                    style={{ marginTop: -10 }}
                />
            }
        />
    )
}

function ExerciseTable(props) {
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    const rowClasses = useRowStyles();


    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, sortable: true, label: 'Exercise' },
        { id: 'actions', numeric: true, disablePadding: false, sortable: false, label: '' }
    ];

    const classes = useStyles();
    // console.log(props.workout.exercises)
    const [state, setState] = useState({
        columns: [
            { title: 'Exercise Name', field: 'name' },
        ],
        data: props.workout.exercises
    });
    const [rows, setRows] = useState(props.workout.exercises);

    // useEffect(() => {
    //     setRows(props.workout.exercises)
    // })

    const addRow = () => {
        console.log(rows)
        const newData = [...rows];
        newData.push({});
        // console.log(newData)
        setRows(newData);
        let newState = Object.assign({}, props.workout);
        newState.exercises = newData;
        props.setWorkout(newState);
    }

    const deleteRow = (index) => {
        const newData = [...rows];
        newData.splice(index, 1);
        console.log(newData);
        setRows(newData);
        let newState = Object.assign({}, props.workout);
        newState.exercises = newData;
        props.setWorkout(newState);
    }

    return (
        <Paper style={{ maxWidth: 600, margin: '0px auto' }}>
            <TableContainer >
                <Table
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                    id="exercise-table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" />

                            <TableCell>
                                Exercise
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Add Exercise">
                                    <IconButton aria-label="add" style={{ padding: 0 }} onClick={addRow}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((exercise, index) => (
                            <TableRow key={exercise.name} className={rowClasses.root}>
                                <TableCell padding="checkbox" />

                                <TableCell component="th" scope="row">
                                    <ControllableDropdown exercise={exercise} workout={props.workout} rows={rows} setRows={setRows} index={index} setWorkout={props.setWorkout} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Tooltip title="Delete Exercise">
                                        <IconButton size='small' edge='end' aria-label="delete" style={{ marginLeft: -60, marginTop: -7 }} onClick={function () { deleteRow(index) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Paper>
    );
}

export const AddWorkoutDialog = (props) => {
    const { currentEvent, setCurrentEvent, handleClose, addModal, classes,
        tabValue, handleTabChange, weekdayPicker, handleStartDateChange,
        handleEndDateChange, DayPicker, handleAddWorkout, handleRepeatToggle } = props;
    return (
        <Dialog open={addModal} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xs'}>
            <DialogContent style={{ marginBottom: -15 }}>
                <IconButton onClick={handleClose} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                    <CloseIcon />
                </IconButton>
            </DialogContent>
            <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                centered
            >
                <Tab label="Workout Info" />
                <Tab label="Exercises" />
            </Tabs>
            <DialogContent hidden={tabValue !== 0}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Workout Name"
                    fullWidth
                    id="workout-name"
                    required
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MMM d, yyy"
                        margin="normal"
                        label={weekdayPicker ? "Start date" : "Date"}
                        disablePast
                        // defaultValue={null}
                        value={currentEvent.startDate ? moment(currentEvent.startDate).format("MMM D, YYYY") : null}
                        onChange={handleStartDateChange}
                        style={{ marginTop: 15, width: 140 }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        id="start-date"
                        autoOk
                        required
                    />
                </MuiPickersUtilsProvider>
                {weekdayPicker &&
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MMM d, yyy"
                            margin="normal"
                            label="End date"
                            id="end-date"
                            shouldDisableDate={(date) => { return moment(date).isSameOrBefore(currentEvent.startDate) }}
                            value={currentEvent.endDate ? moment(currentEvent.endDate).format("MMM D, YYYY") : null}
                            onChange={handleEndDateChange}
                            style={{ marginTop: 15, width: 200, marginLeft: 50 }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            autoOk
                        />
                    </MuiPickersUtilsProvider>
                }

                <DialogContentText style={{ marginTop: 15 }}>
                    <FormControlLabel
                        style={{ marginLeft: 0 }}
                        control={<Switch color="primary" onChange={handleRepeatToggle} checked={weekdayPicker} />}
                        labelPlacement="start"
                        label="Repeat weekly"
                    />
                </DialogContentText>
                {weekdayPicker &&
                    <div>
                        <DialogContentText>Repeat on</DialogContentText>
                        <DayPicker />
                    </div>
                }
            </DialogContent>

            <div hidden={tabValue !== 1}>
                <ExerciseTable workout={currentEvent} setWorkout={setCurrentEvent} />
            </div>

            <DialogActions>
                <Button onClick={handleAddWorkout} color="primary">
                    Create Workout
                    </Button>
            </DialogActions>
        </Dialog>
    )
}


function Calendar(props) {
    console.log(sessionStorage.getItem('calendar'))
    const classes = useStyles();
    const [readModal, toggleReadModal] = useState(false);
    const [editModal, toggleEditModal] = useState(false);
    const [addModal, toggleAddModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(
        {
            id: '',
            title: '',
            startDate: '',
            endDate: '',
            currentDate: '',
            repeat: [],
            exercises: [],
            occurenceText: ''
        });
    const [weekdayPicker, toggleWeekDayPicker] = useState(false);
    const [events, setEvents] = useState();
    const [tabValue, setTabValue] = useState(0);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const getAllEvents = async () => {
        var workouts = await workoutUtil.getAllWorkouts();
        var myEventsList = workouts.workouts.map(workout => {
            if (workout.weekly.length) {
                console.log(workout.endDate)
                return {
                    id: workout._id,
                    title: workout.name,
                    startRecur: moment(workout.startDate).utc().format('YYYY-MM-DD'),
                    endRecur: workout.endDate ? moment(workout.endDate).utc().format('YYYY-MM-DD') : undefined,
                    daysOfWeek: workout.weekly,
                    exercises: workout.exercises
                }
            }
            return {
                id: workout._id,
                title: workout.name,
                date: moment(workout.startDate).utc().format('YYYY-MM-DD'),
                exercises: workout.exercises
            };
        })

        console.log(myEventsList)
        setEvents(myEventsList)
    }


    useEffect(() => {
        if(sessionStorage.getItem('addWorkout')) {
            handleAddOpen();
            sessionStorage.removeItem('addWorkout');
        }
        getAllEvents();
    }, []);

    const handleOpen = (event, el) => {
        let currentWorkout = events.find(x => x.id === event.event._def.publicId);
        let month = event.event._instance.range.end.getMonth() + 1;
        let dayOfMonth = event.event._instance.range.end.getDate();
        let year = event.event._instance.range.end.getFullYear();
        let date = moment(year + " " + month + " " + dayOfMonth).format('YYYY-MM-DD');
        let newState = Object.assign({}, currentEvent);
        newState.id = event.event._def.publicId;
        newState.title = event.event._def.title;
        newState.exercises = currentWorkout.exercises;
        newState.repeat = currentWorkout.daysOfWeek;
        newState.startDate = newState.repeat ? currentWorkout.startRecur : currentWorkout.date;
        newState.endDate = currentWorkout.endRecur;
        newState.currentDate = date;

        console.log(newState)

        if (newState.repeat) {
            toggleWeekDayPicker(true);
            newState.repeat.sort();
            let text = "Occurs every "
            let i = 0;

            for (let num of newState.repeat) {
                if (i === newState.repeat.length - 1) {
                    text += moment().day(num).format('dddd')
                }
                else
                    text += moment().day(num).format('dddd') + ", "
                i++;
            }

            if (newState.endDate) {
                text += " until " + moment(newState.endDate).format('MMMM D, YYYY') + "."
            }

            newState.occurenceText = text;
        }
        else {
            toggleWeekDayPicker(false);
            newState.endDate = null;
        }

        setCurrentEvent(newState);

        toggleReadModal(true);

    };

    const handleClose = () => {
        toggleReadModal(false);
        toggleEditModal(false);
        toggleAddModal(false);
        toggleWeekDayPicker(false);
    };

    const handleEditOpen = () => {
        console.log(currentEvent)
        toggleReadModal(false);
        toggleEditModal(true);
        toggleAddModal(false);
    };

    const handleAddOpen = () => {
        // console.log(currentEvent)
        setCurrentEvent({
            id: '',
            title: '',
            startDate: '',
            endDate: '',
            currentDate: '',
            repeat: [],
            exercises: [],
            occurenceText: ''
        })
        toggleReadModal(false);
        toggleEditModal(false);
        toggleAddModal(true);
    };

    const handleStartDateChange = (date) => {
        let newState = Object.assign({}, currentEvent);
        newState.startDate = moment(date).format('MMM DD, YYYY');
        console.log(newState)
        setCurrentEvent(newState);

    };

    const handleEndDateChange = (date) => {
        let newState = Object.assign({}, currentEvent);
        if (date)
            newState.endDate = moment(date).format('MMM DD, YYYY');
        // else
        //     newState.endDate = null
        console.log(newState)
        setCurrentEvent(newState);
    }

    const handleRepeatToggle = () => {
        toggleWeekDayPicker(!weekdayPicker);
    }

    const handleChangeRepeatedDay = (event, newSelected) => {
        let newState = Object.assign({}, currentEvent);
        newState.repeat = newSelected;
        console.log(newState.repeat)
        setCurrentEvent(newState);
    }

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleUpdateWorkout = () => {
        var startDate = document.getElementById('start-date').value
        var endDate = "";
        if (weekdayPicker)
            endDate = document.getElementById('end-date').value
        var exercises = currentEvent.exercises.map(exercise => {
            return exercise._id;
        })
        console.log({
            name: document.getElementById('workout-name').value,
            startDate: startDate,
            endDate: endDate ? endDate : "",
            weekly: weekdayPicker ? currentEvent.repeat : [],
            overwriteExercises: exercises
        })
        workoutUtil.updateWorkout(currentEvent.id,
            {
                name: document.getElementById('workout-name').value,
                startDate: startDate,
                endDate: endDate ? endDate : "",
                weekly: weekdayPicker ? currentEvent.repeat : [],
                overwriteExercises: exercises
            }
        )
            .then(res => {
                handleClose();
                window.location.reload(false);
            })
    }

    const handleAddWorkout = () => {
        var startDate = document.getElementById('start-date').value
        var endDate = "";
        if (weekdayPicker)
            endDate = document.getElementById('end-date').value
        var exercises = currentEvent.exercises.map(exercise => {
            return exercise._id;
        })
        console.log({
            name: document.getElementById('workout-name').value,
            startDate: startDate,
            endDate: endDate ? endDate : "",
            weekly: weekdayPicker ? currentEvent.repeat : [],
            exercises: exercises
        })
        workoutUtil.addWorkout(
            {
                name: document.getElementById('workout-name').value,
                startDate: startDate,
                endDate: endDate ? endDate : "",
                weekly: weekdayPicker ? currentEvent.repeat : [],
                exercises: exercises
            }
        )
            .then(res => {
                handleClose();
                window.location.reload(false);
            })
    }

    const deleteWorkout = () => {
        workoutUtil.deleteWorkout(currentEvent.id).then(res => {
            handleDeleteClose();
            handleClose();
            window.location.reload(false);
        })
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const DeleteAlert = () => {
        return (
            <div>
                <Dialog
                    open={deleteOpen}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete {currentEvent.title}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            It will permanentely be removed from your calendar
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={deleteWorkout} style={{ color: 'red' }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const DayPicker = () => {
        var daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return (
            <ToggleButtonGroup value={currentEvent.repeat} onChange={handleChangeRepeatedDay} color="blue">
                {daysOfWeek.map((day, key) => (
                    <ToggleButton
                        key={key}
                        value={key}
                        color="blue"
                        title={moment().day(key).format('dddd')}
                    >
                        {day}
                    </ToggleButton>

                ))}
            </ToggleButtonGroup>
        )
    }




    return (
        <div className={props.dashboard ? undefined : classes.content}>

            <div className={props.dashboard ? undefined : classes.appBarSpacer} />

            <Container maxWidth="lg" className={props.dashboard ? undefined : classes.container}>

                {props.dashboard ?
                    <FullCalendar
                        initialView="dayGridWeek"
                        plugins={[dayGridPlugin]}
                        headerToolbar={false}
                        contentHeight={145}
                        eventClassNames={classes.events}
                        events={events}
                        eventClick={(event, el) => handleOpen(event, el)}
                    />
                    :
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClassNames={classes.events}
                        eventClick={(event, el) => handleOpen(event, el)}
                        customButtons={{
                            myCustomButton: {
                                text: 'Add Workout',
                                click: function () {
                                    handleAddOpen()
                                }
                            }
                        }}
                        headerToolbar={{
                            right: 'myCustomButton',
                            left: 'prev,next today',
                            center: 'title'
                        }}
                    />
                }

                {/* Read only modal */}
                <Dialog open={readModal} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xs'}>

                    <DialogContent style={{ marginBottom: -15 }}>
                        <IconButton onClick={handleClose} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={handleDeleteOpen} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={handleEditOpen} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <EditIcon />
                        </IconButton>
                        <DeleteAlert />
                    </DialogContent>
                    <DialogTitle id="form-dialog-title">{currentEvent.title}</DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', marginTop: -5 }}>
                            <AlarmIcon />
                            <DialogContentText style={{ marginLeft: 15 }}>
                                {moment(currentEvent.currentDate).format('dddd, MMMM DD')}
                            </DialogContentText>
                        </div>
                        <div style={{ display: 'flex', marginTop: 10, marginBottom: 5 }}>
                            <AutorenewIcon />
                            <DialogContentText style={{ marginLeft: 15 }}>
                                {currentEvent.occurenceText ? currentEvent.occurenceText : "This workout does not repeat"}
                            </DialogContentText>
                        </div>
                        <List>
                            Exercises
                            {currentEvent.exercises.length ? currentEvent.exercises.map((exercise, key) => (
                            exercise &&
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
                                        control={<Checkbox color='primary' />}
                                        label={exercise.name}
                                    />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography color="textSecondary">
                                        {exercise.notes}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )) : <ListItem><ListItemText primary="Add exercises to this workout to view them here"></ListItemText></ListItem>}

                        </List>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary" disabled={!moment(currentEvent.startDate).isSameOrBefore(moment())}>
                            Mark as done
                        </Button>
                    </DialogActions>

                </Dialog>

                {/* Edit modal */}
                <Dialog open={editModal} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xs'}>
                    <DialogContent style={{ marginBottom: -15 }}>
                        <IconButton onClick={handleClose} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <CloseIcon />
                        </IconButton>
                    </DialogContent>
                    <Tabs
                        value={tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                        centered
                    >
                        <Tab label="Workout Info" />
                        <Tab label="Exercises" />
                    </Tabs>
                    <DialogContent hidden={tabValue !== 0}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Workout Name"
                            fullWidth
                            id="workout-name"
                            defaultValue={currentEvent.title}
                            required
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MMM d, yyy"
                                margin="normal"
                                label={weekdayPicker ? "Start date" : "Date"}
                                value={moment(currentEvent.startDate).format("MMM D, YYYY")}
                                onChange={handleStartDateChange}
                                style={{ marginTop: 15, width: 140 }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                id="start-date"
                                autoOk
                                required
                            />
                        </MuiPickersUtilsProvider>
                        {weekdayPicker &&
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MMM d, yyy"
                                    margin="normal"
                                    label="End date"
                                    id="end-date"
                                    shouldDisableDate={(date) => { return moment(date).isSameOrBefore(currentEvent.startDate) }}
                                    value={currentEvent.endDate ? moment(currentEvent.endDate).format("MMM D, YYYY") : null}
                                    onChange={handleEndDateChange}
                                    style={{ marginTop: 15, width: 200, marginLeft: 50 }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    autoOk
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => handleEndDateChange(null)} style={{ marginRight: 20 }}>
                                                <ClearIcon />
                                            </IconButton>
                                        )
                                    }}
                                    InputAdornmentProps={{
                                        position: "end"
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        }

                        <DialogContentText style={{ marginTop: 15 }}>
                            <FormControlLabel
                                style={{ marginLeft: 0 }}
                                control={<Switch color="primary" onChange={handleRepeatToggle} checked={weekdayPicker} />}
                                labelPlacement="start"
                                label="Repeat weekly"
                            />
                        </DialogContentText>
                        {weekdayPicker &&
                            <div>
                                <DialogContentText>Repeat on</DialogContentText>
                                <DayPicker />
                            </div>
                        }
                    </DialogContent>

                    <div hidden={tabValue !== 1}>
                        <ExerciseTable workout={currentEvent} setWorkout={setCurrentEvent} />
                    </div>

                    <DialogActions>
                        <Button onClick={handleUpdateWorkout} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Creat workout modal */}
                <AddWorkoutDialog
                    currentEvent={currentEvent}
                    setCurrentEvent={setCurrentEvent}
                    handleClose={handleClose}
                    addModal={addModal}
                    classes={classes}
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                    weekdayPicker={weekdayPicker}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    DayPicker={DayPicker}
                    handleAddWorkout={handleAddWorkout}
                    handleRepeatToggle={handleRepeatToggle}
                />

            </Container>
        </div >
    )
}

export default Calendar;