import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Img } from 'react-image';
import Logo from "./logo.svg";
import { NavLink } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import { FormHelperText } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import 'jwt-decode';

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
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
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
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginRight: '-50%',
		transform: 'translate(-50%,-50%)'
	},
}));

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

					<Formik
						initialValues={{
							email: '',
						}}
						validationSchema={Yup.object({
							email: Yup.string("Enter your email")
								.email("Enter valid email")
								.required("Email is required"),
						})}

						onSubmit={(values, { setSubmitting }) => {

							setTimeout(() => {
								setSubmitting(false);
								alert(JSON.stringify(values, null, 2));
							}, 500);
						}}
					>
						{({ submitForm, isSubmitting, errors, touched }) => (
							<form className={classes.form}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Field
											component={TextField}
											name="email"
											type="email"
											label="Email Address"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
										/>
									</Grid>
								</Grid>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
									className={classes.submit}
								>
									Send Password Reset Email
								{isSubmitting && <CircularProgress size={12} className={classes.buttonProgress} />}
								</Button>
								<Grid container justify="flex-end">
									<Grid item>
										<NavLink exact to="signin" variant="body2">
											Already have an account? Sign in
									</NavLink>
									</Grid>
								</Grid>
							</form>
						)}
					</Formik>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}

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

					<Formik
						initialValues={{
							firstname: '',
							lastname: '',
							email: '',
							password: '',
							agree: false
						}}
						validationSchema={Yup.object({
							firstname: Yup.string("Enter your firstname")
								.required("First Name is Required"),
							lastname: Yup.string("Enter your lastname")
								.required("Last Name is Required"),
							email: Yup.string("Enter your email")
								.email("Enter valid email")
								.required("Email is required"),
							password: Yup.string("Enter your password")
								.min(8, "Password must contain at least 8 character")
								.required("Password is required"),
							agree: Yup.bool()
								.oneOf([true], "You must agree to continue")
						})}

						onSubmit={(values, { setSubmitting }) => {
							axios
							.post("http://localhost:5000/api/user/signup", {
								firstName: values.firstname,
								lastName: values.lastname,
								email: values.email,
								password: values.password
							}, 
							{
								headers: { 
									'Access-Control-Allow-Origin': '*',
								},
								mode: 'cors',
							})
							.then(function (response) {
								alert(JSON.stringify(response));
								//setSubmitting(false);
								//localStorage.setItem('jwt', JSON.parse(response).token);
								//localStorage.setItem('user', JSON.parse(response).user);
								window.location.href = '/dashboard';
							})
							.catch(function (err) {
								alert(err);
								console.log(err);
								return null;
							});
							

							/*axios.post('http://fitverse.herokuapp.com/api/user/signup', {
								firstName: values.firstname,
								lastName: values.lastname,
								email: values.email,
								password: values.password
							})
							.then(function (response){
								alert(response);
							})
							.catch(function (error) {
								console.log(error);
							});*/


							/*axios({
								method: 'post',
								url: '/api/user/signup',
								data: {
									firstName: firstname,
									lastName: lastname,
									email: email,
									password: password
								}
							})*/

							//setSubmitting(false);
							/*setTimeout(() => {
								setSubmitting(false);
								alert(JSON.stringify(values, null, 2));
							}, 500);*/
						}}
					>
						{({ submitForm, isSubmitting, errors, touched }) => (
							<form className={classes.form}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											name="firstname"
											type="firstname"
											label="First Name"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
											helperText={touched.firstname ? errors.firstname : ""}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											name="lastname"
											type="lastname"
											label="Last Name"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={TextField}
											name="email"
											type="email"
											label="Email Address"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={TextField}
											name="password"
											type="password"
											label="Password"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={CheckboxWithLabel}
											name="agree"
											type="checkbox"
											Label={{ label: (<div>I agree to the <NavLink exact to="terms">terms</NavLink> and <NavLink exact to="privacy">privacy policy</NavLink></div>) }}
											required
											margin="normal"
											disabled={isSubmitting}
										/>
										{errors.agree && touched.agree ? <FormHelperText error>{errors.agree}</FormHelperText> : null}

									</Grid>
								</Grid>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
									className={classes.submit}
								>
									Sign Up
									{isSubmitting && <CircularProgress size={12} className={classes.buttonProgress} />}
								</Button>
								<Grid container justify="flex-end">
									<Grid item>
										<NavLink exact to="signin" variant="body2">
											Already have an account? Sign in
									</NavLink>
									</Grid>
								</Grid>
							</form>
						)}
					</Formik>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}

export function SignIn() {
	if (localStorage.getItem('jwt') !== null)
	{
		// TODO: decode jwt with jwt-decode
		window.location.href = '/dashboard';
	}
		
	const classes = useStyles();

	const [apiError, setApiError] = useState(false);
	const [alertOpen, setAlertOpen] = useState(true);

	function ErrorAlert() {
		return (
			<Collapse in={alertOpen} style={{width:"100%"}}>
				<Alert 
					severity="error" 
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setAlertOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					Invalid Email Address or Password
				</Alert>
			</Collapse>
		)
	}

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

					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={Yup.object({
							email: Yup.string("Enter your email")
								.email("Enter valid email")
								.required("Email is required"),
							password: Yup.string("Enter your password")
								.required("Password is required"),
						})}

						onSubmit={(values, { setSubmitting }) => {
							axios
							.post("http://localhost:5000/api/user/login", {
								email: values.email,
								password: values.password
							}, {
								headers: { 'Access-Control-Allow-Origin': '*' },
								mode: 'cors',
							})
							.then(function (response) {
								//setSubmitting(false);
								//alert(localStorage.getItem('jwt'));

								if (response.status === 200)
								{
									localStorage.setItem('jwt', response.data.token);
									localStorage.setItem('user', response.data.user);

									window.location.href = '/dashboard';
								}
								else
								{
									localStorage.removeItem('jwt');
									localStorage.removeItem('user');
								}
							})
							.catch(function (err) {
								setApiError(true)
								console.log(err);
								setSubmitting(false);
								localStorage.removeItem('jwt');
								localStorage.removeItem('user');
							});
						}}
					>
						{({ submitForm, isSubmitting, errors, touched }) => (
							<form className={classes.form}>
								<Grid container>
									{apiError ? <ErrorAlert/> : null}
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Field
											component={TextField}
											name="email"
											type="email"
											label="Email Address"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={TextField}
											name="password"
											type="password"
											label="Password"
											required
											fullWidth
											variant="outlined"
											margin="normal"
											disabled={isSubmitting}
										/>
									</Grid>
								</Grid>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
									className={classes.submit}
								>
									Sign in
									{isSubmitting && <CircularProgress size={12} className={classes.buttonProgress} />}
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
						)}
					</Formik>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}