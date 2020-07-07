import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import ButtonComponent from './ButtonComponent';
import Orders from './Orders';
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
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={5} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={5} lg={6}>
            <Paper className={fixedHeightPaper}>
              <ButtonComponent />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Orders />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Orders />
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