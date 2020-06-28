import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {useStyles} from './Navigation'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom'

function Workouts(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.workoutBoxHeight);

    return (
        <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        
        <Container component="main" maxWidth="xs" justify="center" justifyContent="center" style={{ backgroundColor: '#D9DBF1', padding: 20, borderRadius: 24, marginTop: 40, border: '3px solid #ACB0BD' }}>
            <form className={classes.form} noValidate>
                <Typography component="h1" variant="h5" textAlign="center" justify="center" style={{ marginTop: 5, marginBottom: 5, marginLeft: 0}}>
			        New Workout
		        </Typography>
                <Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
                        <TextField
						//autoComplete="fname"
							name="workoutName"
							variant="outlined"
							required
							fullWidth
							id="workoutName"
							label="Workout Name"
                            autoFocus
						/>
					</Grid>
                </Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
                        <TextField
						    //autoComplete="date"
							name="selectDate"
							variant="outlined"
							//required
							fullWidth
							id="selectDate"
							label="Date of Workout"
                            autoFocus
						/>
					</Grid>		
                </Grid>
                <Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
                        <TextField
						    //autoComplete="time"
							name="selectTime"
							variant="outlined"
							//required
							fullWidth
							id="selectTime"
							label="Time of Workout"     //ADD AM-PM DROPDOWN MENU HERE
                            autoFocus
						/>
					</Grid>		
                </Grid>
                <Button size="large" align-self="center" justifyContent="center" variant="contained" color="primary"  style={{backgroundColor: '#416164', padding: 12, borderRadius: 24, marginTop: 25, textJustify:"center"}} component={NavLink} exact path to='/addExercise'>Create Workout</Button>
			</form>
        </Container>
      </div>
  );
}

export default Workouts;