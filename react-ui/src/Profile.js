import React from 'react';
import { useStyles } from './Navigation'
import { mdiAccountCowboyHat } from '@mdi/js';
import Icon from '@mdi/react'
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

function Profile() {
    const classes = useStyles();
    
    function Form(){
        return (
            <>
            <Typography component="h1" variant="h5" style={{ textAlign:'center', marginTop: 5}}>
                <Icon path={mdiAccountCowboyHat} size= {"240px" } />
				<br></br>My Profile
			</Typography>
			<Formik
				initialValues={{
                    firstname: JSON.parse(localStorage.getItem('user')).firstName,
                    lastname: JSON.parse(localStorage.getItem('user')).lastName,
                    email: JSON.parse(localStorage.getItem('user')).email,
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
                            token: localStorage.getItem('jwt'),
                            firstName: values.firstname,
                            lastName: values.lastname,
                        }, {
                            headers: { 'Access-Control-Allow-Origin': '*' },
                            mode: 'cors',
                        })
                        .then(function (response) {
                            setSubmitting(false);

                            if (response.status === 200) {
                                localStorage.setItem('user', JSON.stringify(
                                    {
                                        firstName: values.firstname,
                                        lastName: values.lastname,
                                        email: JSON.parse(localStorage.getItem('user')).email,
                                    }
                                ));
                                window.location.reload(false);
							}
                        })
                        .catch(function (err) {
                            console.log(err);
                            setSubmitting(false);
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

	return (
		<div style={{ height: '100vh', paddingTop: 48, alignItems: 'center', width:"100%" }}>
			<Container component="main" maxWidth="xs" justify="center" style={{ backgroundColor: '#D9DBF1', padding: 20, borderRadius: 24, marginTop: 48, boxShadow: '3px 3px 10px 6px #ccc' }}>
				<CssBaseline />
				<div className={ classes.paper } style={{ backgroundColor: '#D9DBF1'}}>
					{<Form />}
				</div>
			</Container>
		</div>
	);
}

export default Profile;
