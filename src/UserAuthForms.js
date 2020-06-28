import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Img } from 'react-image';
import Logo from "./logo.svg";
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, useField } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import { FormHelperText } from '@material-ui/core';

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
		top:'50%',
		left:'50%',
		marginRight:'-50%',
		transform:'translate(-50%,-50%)'
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
						validate={values => {
							const errors: Partial<Values> = {};
							if (!values.email) {
								errors.email = 'Required';
							} else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
								//!EmailValidator.validate(values.email)
							) {
								errors.email = 'Invalid email address';
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							
							setTimeout(() => {
								setSubmitting(false);
								alert(JSON.stringify(values));
							}, 500);
						}}
					>
						{({ submitForm, isSubmitting }) => (
							<Form className={classes.form}>
								<Field
									component={TextField}
									name="email"
									type="email"
									label="Email"
									required
									fullWidth
									variant="outlined"
									margin="normal"
								/>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
									className={classes.submit}
								>
									Send password reset email
									{isSubmitting && <CircularProgress size={12} className={classes.buttonProgress} />}
    							</Button>
								
							</Form>
						)}
					</Formik>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}

/*<FormControlLabel
										control={<Checkbox value="agree" color="primary" />}
										label={<div>I agree to the <NavLink exact to="terms">terms</NavLink> and <NavLink exact to="privacy">privacy policy</NavLink></div>}
									/>*/

export function SignUp() {
	const classes = useStyles();
	//const agreeError = getFieldMeta('agree').error;

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
							
							setTimeout(() => {
								setSubmitting(false);
								alert(JSON.stringify(values, null, 2));
							}, 500);
						}}
					>
						{({ submitForm, isSubmitting, errors, status, touched }) => (
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
										error={touched.firstname && Boolean(errors.firstname)}
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
										Label={{label:(<div>I agree to the <NavLink exact to="terms">terms</NavLink> and <NavLink exact to="privacy">privacy policy</NavLink></div>)}}
										required
										margin="normal"
										disabled={isSubmitting}
									/>
									{errors.agree && touched.agree ? <FormHelperText error>{errors.agree}</FormHelperText>:null}
																		
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