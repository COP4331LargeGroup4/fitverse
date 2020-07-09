import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import { useStyles } from './Navigation'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import WorkoutUtil from './util-api/workout-utl'

const workoutUtil = new WorkoutUtil();

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, sortable: true, label: 'Exercise Name' },
    { id: 'date', numeric: true, disablePadding: false, sortable: true, label: 'Date Created' },
    { id: 'actions', numeric: true, disablePadding: false, sortable: false, label: '' }
];

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: 'blue',
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

function Row(props) {
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align='right'>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" size='small' style={{ marginRight: 10 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" size='small'>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        hello
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

function Exercises() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [exercises, setExercises] = useState();
    // const [emptyRows, setEmptyRows] = useState();

    const getAllRows = () => {
        workoutUtil.getAllExercises()
            .then(response => {
                setExercises(response.exercises.map(exercise => {
                    return {
                        name: exercise.name,
                        date: exercise.date,
                        notes: exercise.notes
                    }
                }))
            })
    }

    useEffect(() => {
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
        console.log(exercises)
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

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Paper style={{ maxWidth: 600, margin: '0px auto', boxShadow: '3px 3px 10px 6px #ccc' }}>

                    <Toolbar
                        className={classes.root}
                    >
                        <Typography className={classes.title} variant="p" id="tableTitle" component="div" style={{ display: 'flex', width: '100%' }}>
                            <TextField
                                label="Search exercises"
                                id="outlined-margin-dense"
                                margin="dense"
                                // size="small"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (<IconButton type="submit" className={classes.iconButton} aria-label="search" style={{padding: 5}}>
                                        <SearchIcon />
                                    </IconButton>)
                                }}
                            />
                        </Typography>

                        <Tooltip title="Add Exercise">
                            <IconButton aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>

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
                                <TableBody>
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
