import React, { useState } from 'react';
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
import axios from 'axios';

function getAnchor() {
	var url = window.location
	url = url.toString().split('#');
	return (url.length > 1) ? url[1] : null;
}

function Profile() {
    const classes = useStyles();
    const [success, setSuccess] = useState(getAnchor());

    function Form(){
        return (
            <>
            <Typography component="h1" variant="h5" style={{ textAlign:'center', marginTop: 5 }}>
                <FaceIcon style={{ fontSize: "64px" }} />
				<br></br>My Profile
			</Typography>
			<Formik
				initialValues={{
					    firstname: 'user.firstNameHELP',
					    lastname: 'user.lastName',
                        email: 'INSERT EMAIL HERE',
                }}
				validationSchema={Yup.object({
					firstname: Yup.string("Enter your firstname")
							    .required("First Name is Required"),
					lastname: Yup.string("Enter your lastname")
								.required("Last Name is Required"),
				})}

				onSubmit={(values, { setSubmitting }) => {
                    axios
                        .post("/api/user/update", {
                            firstName: values.firstname,
                            lastName: values.lastname,
                        },
                            {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                },
                                mode: 'cors',
                            })
                            .then(function (response) {
                                setSubmitting(false);
                                localStorage.setItem('jwt', response.data.token);
                                //localStorage.setItem('user', response.data.user); //???
                                window.location.href = '#success';
                                setSuccess('success');
                            })
                            .catch(function (err) {
                                alert(err);
                                console.log(err);
                                setSubmitting(false);
                                return null;
                            });
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
                                        disabled
									/>
								</Grid>
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
            </>
        )
    }

    function Success() {
		return (
			<>
			<Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
				update successful
			</Typography>
			</>
		)
	}
    
	return (
		<div style={{ height: '100vh', paddingTop: 48, alignItems: 'center', width:"100%" }}>
			<Container component="main" maxWidth="xs" justify="center" style={{ backgroundColor: '#D9DBF1', padding: 20, borderRadius: 24, marginTop: 48, border: '3px solid #ACB0BD' }}>
				<CssBaseline />
				<div className={ classes.paper } style={{ backgroundColor: '#D9DBF1'}}>
					{success == null ? <Form /> : <Success />}
				</div>
			</Container>
		</div>
	);
}

export default Profile;
