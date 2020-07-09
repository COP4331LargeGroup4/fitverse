import 'date-fns';
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close';
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
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import WorkoutUtil from './util-api/workout-utl'

const workoutUtil = new WorkoutUtil();

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
        // console.log(events)
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

        setCurrentEvent(newState);
        toggleReadModal(true);

    };

    const handleClose = () => {
        toggleReadModal(false);
        toggleEditModal(false);
        toggleWeekDayPicker(false);
    };

    const handleEditOpen = () => {
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
                                id="date-picker-inline"
                                label="Date"
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
                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MMM d, yyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="End date"
                                        value={currentEvent.endDate.length ? moment(currentEvent.endDate).format("MMM D, YYYY") : null}
                                        onChange={handleEndDateChange}
                                        style={{ marginTop: -15 }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider> */}
                                <DialogContentText>Repeat on</DialogContentText>
                                <DayPicker />
                            </div>
                        }
                    </DialogContent>

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
