import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Calendar from './Calendar';
import ButtonComponent from './ButtonComponent';
import DailyChecklist from './DailyChecklist';
import {useStyles} from './Navigation'
import { NavLink } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <NavLink exact to="/" color="inherit">
			  Fitverse
		  </NavLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper style={{ boxShadow: '3px 3px 10px 6px #ccc', borderRadius: 8, padding: '5px 5px 20px 10px' }}>
              <Typography component="h3" variant="h6" color="inherit" noWrap className={classes.title}>
                This week's scheduled workouts:
              </Typography>
              <Calendar dashboard={true} />
            </Paper>
          </Grid>
          {/* Exercise Checklist */}
          <Grid item xs={12} md={5} lg={6}>
            <Paper style={{ boxShadow: '3px 3px 10px 6px #a6a5a7', backgroundColor: '#D0CDD7', borderRadius: 8, padding: '5px 5px 20px 10px' }}>
                <DailyChecklist />
            </Paper>
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <Paper style={{ boxShadow: '3px 3px 10px 6px #a6a5a7', backgroundColor: '#D0CDD7', borderRadius: 8, padding: '5px 5px 20px 10px' }}>
              <Typography component="h3" variant="h6" color="inherit" noWrap className={classes.title}>
                  Quick Add
              </Typography>
              <ButtonComponent />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}

export default Dashboard;