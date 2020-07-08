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
    ListSubheader,
    IconButton,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close';
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
            title: '',
            startDate: '',
            endDate: '',
            repeat: []
        });
    const [weekdayPicker, toggleWeekDayPicker] = useState(false);

    var myEventsList = [
        {
            title: 'Chest and Triceps',
            date: '2020-07-06',
            startRecur: currentEvent.repeat.length ? '2020-07-06' : '',
            endRecur: '',
            daysOfWeek: currentEvent.repeat.length ? currentEvent.repeat : ''
        },
        {
            title: 'Back and Biceps',
            date: '2020-07-03',
            startRecur: currentEvent.repeat.length ? '2020-06-23' : '',
            endRecur: '',
            daysOfWeek: currentEvent.repeat.length ? currentEvent.repeat : ''
        },
        {
            title: 'Cardio',
            date: '2020-07-12',
            startRecur: currentEvent.repeat.length ? '2020-06-23' : '',
            endRecur: '',
            daysOfWeek: currentEvent.repeat.length ? currentEvent.repeat : ''
        },
    ]

    const [events, setEvents] = useState(myEventsList);

    useEffect(() => {
        var index = myEventsList.map(e => e.title).indexOf(currentEvent.title);
        if (index !== -1) {
            myEventsList[index].startRecur = currentEvent.repeat.length > 0 ? '2020-06-23' : '';
            myEventsList[index].date = currentEvent.repeat.length > 0 ? undefined : '2020-06-23';
            myEventsList[index].daysOfWeek = currentEvent.repeat.length > 0 ? currentEvent.repeat : undefined;
        }
    });

    const handleOpen = (event, el) => {
        workoutUtil.getAllWorkouts().then(result => {
            console.log(result)
        })
        var dayOfWeek = event.event._instance.range.end.getDay();
        var month = event.event._instance.range.end.getMonth() + 1;
        var dayOfMonth = event.event._instance.range.end.getDate();
        var year = event.event._instance.range.end.getFullYear();

        var date = moment(year + " " + month + " " + dayOfMonth).format('YYYY-MM-DD');

        let newState = Object.assign({}, currentEvent);
        newState.title = event.event._def.title;
        newState.startDate = date;
        console.log(date)

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
        setEvents(myEventsList);
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
                        // firstDay='1'
                        // locale='en'
                        // firstDay='1'
                        plugins={[dayGridPlugin]}
                        headerToolbar={false}
                        contentHeight={145}
                        // height={120}
                        // eventBackgroundColor={'green'}
                        eventClassNames={classes.events}
                        events={events}
                        eventClick={(event, el) => handleOpen(event, el)}
                    />
                    :
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        // initialView="dayGridWeek"
                        initialView="dayGridMonth"
                        // headerToolbar={false}
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
                            Excercises
                        </List>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
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
