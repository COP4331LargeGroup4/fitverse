import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    IconButton,
    Tooltip,
    TextField,
    Collapse,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
} from '@material-ui/core'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useStyles } from './Navigation'
import WorkoutUtil from './util-api/workout-utl'

const workoutUtil = new WorkoutUtil();

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, sortable: true, label: 'Exercise Name' },
    { id: 'date', numeric: true, disablePadding: false, sortable: true, label: 'Date Created' },
    { id: 'actions', numeric: true, disablePadding: false, sortable: false, label: '' }
];

function Row(props) {
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    const { row } = props;
    const [collapseOpen, setCollapseOpen] = useState(false);
    const rowClasses = useRowStyles();
    const classes = useStyles();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [exerciseEditOpen, setExerciseEditOpen] = useState(false);
    const [nameErrorText, setNameErrorText] = useState("");

    const handleExerciseEditOpen = () => {
        setExerciseEditOpen(true);
    };

    const handleExerciseEditClose = () => {
        setExerciseEditOpen(false);
        setNameErrorText("");
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDeleteExercise = (id) => {
        workoutUtil.deleteExercise(id).then(res => {
            handleDeleteClose();
            window.location.reload(false);
        });
    }

    const updateExercise = (id) => {
        setNameErrorText("");
        var name = document.getElementById('edit-exercise-name').value;

        if (!name) {
            setNameErrorText('Please provide a name for your exercise');
            return;
        }

        workoutUtil.updateExercise(id,
            {
                name: name,
                notes: document.getElementById('edit-exercise-notes').value
            }
        ).then(res => {
            handleExerciseEditClose();
            window.location.reload(false);
        })
    }

    const EditDialog = (props) => {
        const { exercise } = props;

        return (
            <Dialog open={exerciseEditOpen} onClose={handleExerciseEditClose} aria-labelledby="form-dialog-title">
                <DialogContent style={{ marginBottom: -25 }}>
                    <IconButton onClick={handleExerciseEditClose} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                        <CloseIcon />
                    </IconButton>
                </DialogContent>
                <DialogTitle id="form-dialog-title">Edit exercise</DialogTitle>
                <DialogContent style={{ marginTop: -10 }}>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        required
                        fullWidth
                        type="name"
                        id="edit-exercise-name"
                        defaultValue={!nameErrorText ? exercise.name : undefined}
                        label="Exercise name"
                        error={nameErrorText}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        margin="dense"
                        name="myNotes"
                        variant="outlined"
                        fullWidth
                        type="goals"
                        id="edit-exercise-notes"
                        label="Notes"
                        defaultValue={exercise.notes}
                        multiline
                        rows={4}
                    />
                </DialogContent>

                {nameErrorText &&
                    <DialogContent style={{ color: 'red' }}>
                        {nameErrorText}
                    </DialogContent>
                }

                <DialogActions>
                    <Button onClick={function () { updateExercise(exercise.id) }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const DeleteAlert = (props) => {
        const { exercise } = props;
        return (
            <div>
                <Dialog
                    open={deleteOpen}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete {exercise.name}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            It will permanentely be removed from your exercises
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={function () { handleDeleteExercise(exercise.id) }} style={{ color: 'red' }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <React.Fragment>
            <TableRow className={rowClasses.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setCollapseOpen(!collapseOpen)}>
                        {collapseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align='right'>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" size='small' style={{ marginRight: 10 }} onClick={handleDeleteOpen}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" size='small' onClick={handleExerciseEditOpen}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <DeleteAlert exercise={row} />
                    <EditDialog exercise={row} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        <div style={{ paddingLeft: 19, paddingBottom: 15 }}>
                            Notes: {row.notes}
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

function Exercises() {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [exercises, setExercises] = useState();
    const [exerciseAddOpen, setExerciseAddOpen] = useState(false);
    const [nameErrorText, setNameErrorText] = useState("");
    const [allExercises, setAllExercises] = useState();

    const handleExerciseOpen = () => {
        setExerciseAddOpen(true);
    };
    const handleExerciseClose = () => {
        setExerciseAddOpen(false);
        setNameErrorText("");
    };


    const getAllRows = () => {
        workoutUtil.getAllExercises()
            .then(response => {
                let exercises = response.exercises.map(exercise => {
                    return {
                        id: exercise._id,
                        name: exercise.name,
                        date: moment(exercise.dateCreated).format('YYYY-MM-DD'),
                        notes: exercise.notes
                    }
                })
                setExercises(exercises);
                setAllExercises(exercises)
            })
    }

    useEffect(() => {
        if (sessionStorage.getItem('addExercise')) {
            handleExerciseOpen();
            sessionStorage.removeItem('addExercise');
        }

        getAllRows();
    }, []);

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (comparator) => {
        var stabilizedThis = exercises.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const getEmptyRows = () => {
        return rowsPerPage - Math.min(rowsPerPage, exercises.length - page * rowsPerPage)
    }

    const createExercise = () => {
        setNameErrorText("");
        var name = document.getElementById('new-exercise-name').value;

        if (!name) {
            setNameErrorText("Please provide a name for your exercise");
            return
        }

        workoutUtil.createExercise(
            {
                name: name,
                notes: document.getElementById('new-exercise-notes').value
            }
        ).then(res => {
            handleExerciseClose();
            window.location.reload(false);
        })
    }

    const searchExercises = (searchValue) => {
        if (searchValue) {
            var results = allExercises.filter(function (exercise) {
                return exercise.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
            });

            setExercises(results);
        }
        else {
            setExercises(allExercises);
        }
    }

    const AddExerciseDialog = () => {
        return (
            <Dialog open={exerciseAddOpen} onClose={handleExerciseClose} aria-labelledby="form-dialog-title">
                <DialogContent style={{ marginBottom: -25 }}>
                    <IconButton onClick={handleExerciseClose} size='small' edge='end' aria-label="delete" className={classes.eventButtons}>
                        <CloseIcon />
                    </IconButton>
                </DialogContent>
                <DialogTitle id="form-dialog-title">Add an exercise</DialogTitle>
                <DialogContent style={{ marginTop: -10 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="exerciseName"
                        variant="outlined"
                        required
                        fullWidth
                        type="name"
                        id="new-exercise-name"
                        label="Exercise name"
                        error={nameErrorText}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        margin="dense"
                        name="myNotes"
                        variant="outlined"
                        fullWidth
                        type="goals"
                        id="new-exercise-notes"
                        label="Notes"
                        multiline
                        rows={4}
                    />
                </DialogContent>

                {nameErrorText &&
                    <DialogContent style={{ color: 'red' }}>
                        {nameErrorText}
                    </DialogContent>
                }

                <DialogActions>
                    <Button onClick={createExercise} color="primary">
                        Add Exercise
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <div data-testid="content" className={classes.content}>
            <div data-testid="barspacer" className={classes.appBarSpacer} />
            <Container data-testid="container" maxWidth="lg" className={classes.container}>
                <Paper data-testid="paper" style={{ maxWidth: 600, margin: '0px auto', boxShadow: '3px 3px 10px 6px #ccc', backgroundColor: '#D9DBF1'}}>

                    <Toolbar
                        data-testid = "toolbar"
                        className={classes.root}
                    >
                        <Typography data-testid="tableTitle" className={classes.title} variant="p" id="tableTitle" component="div" style={{ display: 'flex', width: '100%' }}>
                            <TextField
                                data-testid="searchexerciseLabel"
                                label="Search exercises"
                                id="outlined-margin-dense"
                                margin="dense"
                                variant="outlined"
                                onChange={(event, value) => searchExercises(event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <SearchIcon />
                                    )
                                }}
                            />
                        </Typography>

                        <Tooltip title="Add Exercise">
                            <IconButton data-testid="addexerciseButton" aria-label="add" onClick={handleExerciseOpen}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <AddExerciseDialog />

                    </Toolbar>

                    <TableContainer >
                        <Table
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox" />
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align={headCell.numeric ? 'right' : 'left'}
                                            padding={headCell.disablePadding ? 'none' : 'default'}
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={createSortHandler(headCell.id)}
                                                disabled={!headCell.sortable}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            {exercises ? <TableBody>
                                {stableSort(getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <Row key={index} row={row} />
                                        );
                                    })}

                                {getEmptyRows > 0 && (
                                    <TableRow style={{ height: 53 * getEmptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}

                            </TableBody>
                                :
                                <TableBody data-testid="exerciseTable">
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <p style={{ margin: 'auto', display: 'flex', textAlign: 'center' }}>Add exercises to view them here</p>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }

                        </Table>
                    </TableContainer>

                    {exercises && <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={exercises.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />}
                </Paper>
            </Container>
        </div>
    )
}

export default Exercises;
