import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { useStyles } from './Navigation'
import Calendar from './Calendar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
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
          <Grid item xs={12}>
            <Paper style={{ boxShadow: '3px 3px 10px 6px #ccc', borderRadius: 8, padding: '5px 5px 20px 10px' }}>
              <Typography component="h3" variant="h6" color="inherit" noWrap className={classes.title}>
                This week's scheduled workouts:
              </Typography>
              <Calendar dashboard={true} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
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