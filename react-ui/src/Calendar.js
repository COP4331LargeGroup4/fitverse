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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function ControllableDropdown(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [selectedExercise, setSelectedExercise] = useState(props.exercise._id);

    // const getAllExercises = async () => {

    //     var exercises = await workoutUtil.getAllExercises();

    //     // var available = _.filter(exercises.exercises, function (obj) { return !_.findWhere(props.workout.exercises, { _id: obj._id }); });

    //     setAvailableExercises(exercises.exercises);
    //     console.log(value);

    //     return exercises.exercises;
    // }

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

        // getAllExercises().then(res => {
        //     getSelectedItem();
        // });
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
                console.log(selectedExercise)
                if(newValue)
                    setSelectedExercise(newValue._id);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            defaultValue={Object.keys(props.exercise).length !== 0 ? props.exercise : undefined}
            // id={}
            style={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Select an exercise" margin="normal" style={{ marginTop: -10 }} />}
        />
    )
}

function MaterialTableDemo(props) {
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
        const newData = [...rows];
        newData.push({});
        // console.log(newData)
        setRows(newData);
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
                            <TableRow key={index} className={rowClasses.root}>
                                <TableCell padding="checkbox" />

                                <TableCell component="th" scope="row">
                                    <ControllableDropdown exercise={exercise} workout={props.workout} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Tooltip title="Delete Exercise">
                                    <IconButton size='small' edge='end' aria-label="delete" style={{marginLeft: -60, marginTop: -7}} onClick={function(){console.log(rows.length)}}>
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


function Calendar(props) {
    const classes = useStyles();
    const [readModal, toggleReadModal] = useState(false);
    const [editModal, toggleEditModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(
        {
            id: '',
            title: '',
            startDate: '',
            endDate: '',
            repeat: [],
            exercises: []
        });
    const [weekdayPicker, toggleWeekDayPicker] = useState(false);
    const [events, setEvents] = useState();
    const [tabValue, setTabValue] = useState(0);

    const getAllEvents = async () => {
        var workouts = await workoutUtil.getAllWorkouts();
        var myEventsList = workouts.workouts.map(workout => {
            if (workout.weekly.length) {
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
        // var index = myEventsList.map(e => e.title).indexOf(currentEvent.title);
        // if (index !== -1) {
        //     myEventsList[index].startRecur = currentEvent.repeat.length > 0 ? '2020-06-23' : '';
        //     myEventsList[index].date = currentEvent.repeat.length > 0 ? undefined : '2020-06-23';
        //     myEventsList[index].daysOfWeek = currentEvent.repeat.length > 0 ? currentEvent.repeat : undefined;
        // }
        getAllEvents();
    }, []);

    const handleOpen = (event, el) => {
        if (event.event._def.publicId === currentEvent.id) {
            let month = event.event._instance.range.end.getMonth() + 1;
            let dayOfMonth = event.event._instance.range.end.getDate();
            let year = event.event._instance.range.end.getFullYear();
            let date = moment(year + " " + month + " " + dayOfMonth).format('YYYY-MM-DD');
            let newState = Object.assign({}, currentEvent);
            newState.startDate = date;
            let repeat = newState.repeat.length ? true : false;
            toggleWeekDayPicker(true);
            setCurrentEvent(newState);
            toggleReadModal(true);
            return;
        }

        let currentWorkout = events.find(x => x.id === event.event._def.publicId);
        let month = event.event._instance.range.end.getMonth() + 1;
        let dayOfMonth = event.event._instance.range.end.getDate();
        let year = event.event._instance.range.end.getFullYear();
        let date = moment(year + " " + month + " " + dayOfMonth).format('YYYY-MM-DD');
        let newState = Object.assign({}, currentEvent);
        newState.id = event.event._def.publicId;
        newState.title = event.event._def.title;
        newState.startDate = date;
        newState.exercises = currentWorkout.exercises;
        newState.repeat = currentWorkout.daysOfWeek;

        let repeat = newState.repeat ? true : false;
        toggleWeekDayPicker(repeat);
        console.log(newState)
        setCurrentEvent(newState);
        toggleReadModal(true);

    };

    const handleClose = () => {
        toggleReadModal(false);
        toggleEditModal(false);
        toggleWeekDayPicker(false);
    };

    const handleEditOpen = () => {
        console.log(currentEvent)
        toggleReadModal(false);
        toggleEditModal(true);
    };

    const handleStartDateChange = (date) => {
        let newState = Object.assign({}, currentEvent);
        newState.startDate = moment(date).format('MMM DD, YYYY');
        console.log(newState)
        setCurrentEvent(newState);

    };

    const handleEndDateChange = (date) => {
        let newState = Object.assign({}, currentEvent);
        newState.endDate = moment(date).format('MMM DD, YYYY');
        console.log(newState)
        setCurrentEvent(newState);
    }

    const handleRepeatToggle = () => {
        toggleWeekDayPicker(!weekdayPicker);
    }

    const handleChangeRepeatedDay = (event, newSelected) => {
        let newState = Object.assign({}, currentEvent);
        newState.repeat = newSelected;
        setCurrentEvent(newState);
    }

    const handleSave = () => {
        // setEvents(myEventsList);
        handleClose();
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
                    />
                }

                {/* Read only modal */}
                <Dialog open={readModal} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xs'}>

                    <DialogContent style={{ marginBottom: -15 }}>
                        <IconButton onClick={handleClose} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={handleEditOpen} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                            <EditIcon />
                        </IconButton>
                    </DialogContent>
                    <DialogTitle id="form-dialog-title">{currentEvent.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {moment(currentEvent.startDate).format('dddd, MMMM DD')}
                        </DialogContentText>
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
                    <TabPanel value={tabValue} index={0}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Workout Name"
                                fullWidth
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
                                        value={currentEvent.endDate.length ? moment(currentEvent.endDate).format("MMM D, YYYY") : null}
                                        onChange={handleEndDateChange}
                                        style={{ marginTop: 15, width: 140, marginLeft: 50 }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
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
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <MaterialTableDemo workout={currentEvent} />
                    </TabPanel>
                    <DialogActions>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </div >
    )
}

export default Calendar;
