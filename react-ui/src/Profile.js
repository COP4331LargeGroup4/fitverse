import React from 'react';
import { useStyles } from './Navigation'
import FaceIcon from '@material-ui/icons/Face';
import {
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    Typography,
  } from '@material-ui/core';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

function Profile() {
    const classes = useStyles();
	return (
		<div style={{ height: '100vh', paddingTop: 48, alignItems: 'center', width:"100%" }}>
			<Container component="main" maxWidth="xs" justify="center" style={{ backgroundColor: '#D9DBF1', padding: 20, borderRadius: 24, marginTop: 48, border: '3px solid #ACB0BD' }}>
				<CssBaseline />
				<div className={ classes.paper } style={{ backgroundColor: '#D9DBF1'}}>
					<Typography component="h1" variant="h5" style={{ textAlign:'center', marginTop: 5 }}>
                        <FaceIcon style={{ fontSize: "64px" }} />
						<br></br>My Profile
					</Typography>

                    {/* These values need to be initialized */}
					<Formik
						initialValues={{
							firstname: '',
							lastname: '',
							email: '',
							password: '',
							agree: false
                        }}
                        /* CHANGE THIS!!! for the profile page */
						validationSchema={Yup.object({
							firstname: Yup.string("Enter your firstname")
								.required("First Name is Required"),
							lastname: Yup.string("Enter your lastname")
								.required("Last Name is Required"),
							email: Yup.string("Enter your email") // should email be allowed to be modified?
								.email("Enter valid email")
								.required("Email is required"),
							password: Yup.string("Enter your password") // pswd in profile or no?
								.min(8, "Password must contain at least 8 character")
								.required("Password is required"),
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
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											name="firstname"
											type="firstname"
											label="First Name"
											required
											fullWidth
											variant="outlined"
											margin="dense"
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
											margin="dense"
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
											margin="dense"
                                            disabled={isSubmitting}
                                            disabled // do we want them to be able to edit this?
										/>
									</Grid>
									{/*<Grid item xs={12}>
										<Field
											component={TextField}
											name="password"
											type="password"
											label="Password"
											required
											fullWidth
											variant="outlined"
											margin="dense"
											disabled={isSubmitting}
										/>
                                    </Grid>*/}
                                    <Grid item xs={12}>
										<Field
											component={TextField}
											name="notes"
											type="notes"
											label="Notes"
											fullWidth
											variant="outlined"
											margin="dense"
                                            disabled={isSubmitting}
                                            multiline
                                            rows={4} 
										/>
									</Grid> 
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={submitForm}
                                            className={classes.submit}
                                        >
                                            Save
                                            {isSubmitting && <CircularProgress size={12} className={classes.buttonProgress} />}
								        </Button>
                                    </Grid> 
								</Grid>
							</form>
						)}
					</Formik>
				</div>
			</Container>
		</div>
	);
}

export default Profile;
