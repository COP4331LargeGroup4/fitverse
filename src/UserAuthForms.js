import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Img } from 'react-image';
import Logo from "./logo.svg";
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

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export function SignUp() {
	const classes = useStyles();

	return (
		<div style={{ backgroundColor: '#D9DBF1', height: '100vh', paddingTop: 48 }}>
			<Container component="main" maxWidth="xs" justify="center" style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 24, marginTop: 48, border: '3px solid #ACB0BD' }}>
				<CssBaseline />
				<div className={classes.paper}>
					<NavLink exact to="/">
						<Img src={Logo} style={{ maxWidth: "100%" }} />
					</NavLink>
					<Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="agree" color="primary" />}
									label={<div>I agree to the <NavLink exact to="terms">terms</NavLink> and <NavLink exact to="privacy">privacy policy</NavLink></div>}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<NavLink exact to="signin" variant="body2">
									Already have an account? Sign in
								</NavLink>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}

export function SignIn() {
	const classes = useStyles();

	return (
		<div style={{ backgroundColor: '#D9DBF1', height: '100vh', paddingTop: 48 }}>
			<Container component="main" maxWidth="xs" justify="center" style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 24, marginTop: 48, border: '3px solid #ACB0BD' }}>
				<CssBaseline />
				<div className={classes.paper}>
					<NavLink exact to="/">
						<Img src={Logo} style={{ maxWidth: "100%" }} />
					</NavLink>
					<Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<NavLink exact to="resetpassword" variant="body2">
									Forgot password?
								</NavLink>
							</Grid>
							<Grid item>
								<NavLink exact to="signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</NavLink>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}

export function ResetPassword() {
	const classes = useStyles();

	return (
		<div style={{ backgroundColor: '#D9DBF1', height: '100vh', paddingTop: 48 }}>
			<Container component="main" maxWidth="xs" justify="center" style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 24, marginTop: 48, border: '3px solid #ACB0BD' }}>
				<CssBaseline />
				<div className={classes.paper}>
					<NavLink exact to="/">
						<Img src={Logo} style={{ maxWidth: "100%" }} />
					</NavLink>
					<Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
						Forgot your password?
					</Typography>
					<Typography component="subtitle1">
						Enter your email to reset it
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Send password reset email
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}