import 'date-fns';
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

const myEventsList = [
    { title: 'Chest and Triceps', date: '2020-06-27' },
    { title: 'Chest and Triceps', date: '2020-06-28' },
    { title: 'Chest and Triceps', start: '2020-06-29' },
    { title: 'event 1', date: '2020-06-27' },
    { title: 'event 2', date: '2020-07-01' }
]

function Calendar(props) {
    const classes = useStyles();
    const [readModal, toggleReadModal] = useState(false);
    const [editModal, toggleEditModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(
        {
            title: '',
            dayOfWeek: '',
            month: '',
            day: '',
            year: '',
            repeat: []
        });
    const [events, setEvents] = useState(myEventsList);
    const [weekdayPicker, toggleWeekDayPicker] = useState(false);

    const handleOpen = (event, el) => {
        var dayOfWeek = event.event._instance.range.end.getDay();
        var month = event.event._instance.range.end.getMonth() + 1;
        var dayOfMonth = event.event._instance.range.end.getDate();
        var year = event.event._instance.range.end.getFullYear();

        var monthString = moment(month.toString()).format('MMMM');
        var dayOfWeekString = moment().weekday(dayOfWeek).format('dddd');
        var yearString = year.toString();

        let newState = Object.assign({}, currentEvent);
        newState.title = event.event._def.title;
        newState.dayOfWeek = dayOfWeekString;
        newState.month = monthString;
        newState.day = dayOfMonth;
        newState.year = yearString;

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

    const handleDateChange = (date) => {
        let newState = Object.assign({}, currentEvent);
        newState.title = currentEvent.title;
        newState.dayOfWeek = moment(date).format('dddd');
        newState.month = moment(date).format('MMMM');
        newState.day = moment(date).format('D');
        newState.year = moment(date).format('YYYY');
        setCurrentEvent(newState);
    };

    const handleRepeatToggle = () => {
        toggleWeekDayPicker(!weekdayPicker);
    }

    const handleChangeRepeatedDay = (event, newSelected) => {
        let newState = Object.assign({}, currentEvent);
        newState.repeat = newSelected;
        setCurrentEvent(newState);
        console.log(newSelected);
    }

    const DayPicker = () => {
        var daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return (
            <ToggleButtonGroup value={currentEvent.repeat} onChange={handleChangeRepeatedDay}>
                {daysOfWeek.map((day, key) => (
                    <ToggleButton
                        key={key}
                        value={daysOfWeek[key]}
                    >
                        {day}
                    </ToggleButton>

                ))}
            </ToggleButtonGroup>
        )
    }

    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClassNames={classes.events}
                    eventClick={(event, el) => handleOpen(event, el)}
                />
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
                            {currentEvent.dayOfWeek + ", " + currentEvent.month + " " + currentEvent.day}
                        </DialogContentText>
                        <List>
                            <ListSubheader>
                                Excercises:
                            </ListSubheader>
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
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MMM d, yyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date"
                                value={moment(currentEvent.day + currentEvent.month + currentEvent.year).format("MMM D, YYYY")}
                                onChange={handleDateChange}
                                style={{ marginTop: 15 }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <DialogContentText style={{ marginTop: 15 }}>
                            <FormControlLabel
                                style={{ marginLeft: 0 }}
                                control={<Switch color="primary" onChange={handleRepeatToggle} />}
                                labelPlacement="start"
                                label="Repeat weekly"
                            />
                        </DialogContentText>
                        {weekdayPicker &&
                            <DayPicker />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </div >
    )
}

export default Calendar;
