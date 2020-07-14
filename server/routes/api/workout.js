const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const _ = require('underscore');

// User model
const Workout = require('../../models/workout');
const Exercise = require('../../models/exercise');
const CompletedExercises = require('../../models/completedExercises');
const jwtConfig = require('./Config/jwtConfig');

const { options } = require('mongoose');

// @route POST api/workout/create
// @desc Create workout
// @access  Public
router.post('/create', async (req, res) => {
	const { token, name, exercises, weekly, startDate, endDate, notes } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json()
				} else {
					res.status(403).json()
				}
			} else {

				try {
					// Verify request
					if (!name || !weekly || !startDate) {
						httpErr = 400;
						throw Error('Missing required fields');
					}

					// TODO: make sure all exercises exist and belong to the user

					var newWorkout = new Workout({
						userId: authData._id,
						name,
						exercises,
						weekly,
						startDate,
						endDate,
						notes
					})

					const savedExercise = await newWorkout.save();
					if (!savedExercise) {
						httpErr = 500;
						throw Error('Something went wrong saving the workout');
					}


					res.status(201).json()

				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});

// @route POST api/workout/read
// @desc Read single workout by ID
// @access  Public
router.post('/read', async (req, res) => {
	const { token, id } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json()
				} else {
					res.status(403).json()
				}
			} else {

				try {
					// Verify request
					if (!id) {
						httpErr = 400
						throw Error('No id');
					}

					var workout = await Workout.findById(id);

					// Auth
					if (!workout) {
						httpErr = 404
						throw Error('Nonexistent Workout')
					}

					if (workout.userId != authData._id) {
						httpErr = 403;
						throw Error('Invalid credentials')
					}

					var retWorkout = {
						_id: workout._id,
						name: workout.name,
						weekly: workout.weekly,
						startDate: workout.startDate,
						endDate: workout.endDate,
						doneDates: workout.doneDates,
						deletedDates: workout.deletedDates
					}

					var exercises =
						workout.exercises.map(async (exId) => {
							var exercise = await Exercise.findById(exId);
							if (exercise) {
								if (new String(exercise.userId).valueOf() == new String(authData._id).valueOf()
								) {
									return exercise;
								}
							}
						});
					Promise.all(exercises).then(result => {
						retWorkout['exercises'] = _.without(result, null, undefined);
						res.status(200).json({ workout: retWorkout });
					});

				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});

// @route POST api/workout/readAll
// @desc Get all workouts
// @access  Public
router.post('/readAll', async (req, res) => {
	const { token } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json()
				} else {
					res.status(403).json()
				}
			} else {

				try {
					const workouts = await Workout.find({ userId: authData._id });

					// Cursed Code don't touch don't replicate
					var retWorkouts =
						workouts.map((workout) => {
							var retWorkout = {
								_id: workout._id,
								name: workout.name,
								weekly: workout.weekly,
								startDate: workout.startDate,
								endDate: workout.endDate,
								doneDates: workout.doneDates,
								deletedDates: workout.deletedDates
							}

							var exercises =
								workout.exercises.map(async (exId) => {
									var exercise = await Exercise.findById(exId);
									if (exercise) {
										if (new String(exercise.userId).valueOf() == new String(authData._id).valueOf()
										) {
											return exercise;
										}
									}
								});
							var promises =
								Promise.all(exercises).then(result => {
									//console.log(result)
									retWorkout['exercises'] = _.without(result, null, undefined);
									return retWorkout;
								});

							return promises
						});
					Promise.all(retWorkouts).then(result => {
						res.status(200).json({ workouts: result });
					});
				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});

router.post('/readAllDateRange', async (req, res) => {
	const { token, startDate, endDate } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json()
				} else {
					res.status(403).json()
				}
			} else {

				try {
					// Verify request
					if (!startDate) {
						httpErr = 400
						throw Error('Missing required fields');
					}

					const workouts =
						await Workout.find({
							userId: authData._id,
							startDate: { $lt: new Date(endDate) },
							$or: [
								{ endDate: { $eq: undefined } },
								{ endDate: { $gt: new Date(startDate) } }
							]
						});

					// Cursed Code don't touch don't replicate
					var retWorkouts =
						workouts.map((workout) => {
							var retWorkout = {
								_id: workout._id,
								name: workout.name,
								weekly: workout.weekly,
								startDate: workout.startDate,
								endDate: workout.endDate,
								doneDates: workout.doneDates,
								deletedDates: workout.deletedDates
							}

							var exercises =
								workout.exercises.map(async (exId) => {
									var exercise = await Exercise.findById(exId);
									if (exercise) {
										if (new String(exercise.userId).valueOf() == new String(authData._id).valueOf()
										) {
											return exercise;
										}
									}
								});
							var promises =
								Promise.all(exercises).then(result => {
									retWorkout['exercises'] = _.without(result, null, undefined);
									return retWorkout;
								});

							return promises
						});
					Promise.all(retWorkouts).then(result => {
						res.status(200).json({ workouts: result });
					});
				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});

// @route POST api/workout/update
// @desc Update single workout by ID
// @access  Public
router.post('/update', async (req, res) => {
	const { token, id } = req.body;
	const { name, removeExercises, addExercises, weekly, startDate, endDate, notes,
		addDeviatedWorkouts, removeDeviatedWorkouts, deletedDates, addDoneDates, removeDoneDates } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json();
				} else {
					res.status(403).json();
				}
			} else {
				try {
					if (!id) {
						httpErr = 400
						throw Error('No id');
					}

					// Check if passed in exercises actually exist and belong to user
					// As of now that check in happening in read it'd be better if it never got added

					var workout = await Workout.findById(id);

					if (!workout) {
						httpErr = 404
						throw Error('Nonexistent Workout');
					}

					if (workout.userId != authData._id) {
						httpErr = 403;
						throw Error('Invalid credentials');
					}

					Workout.findByIdAndUpdate(id,
						{
							name,
							exercises: _.difference(_.union(addExercises, workout.exercises), removeExercises),
							doneDates: _.difference(_.union(addDoneDates, workout.doneDates), removeDoneDates),
							deviatedWorkouts: _.difference(_.union(addDeviatedWorkouts, workout.doneDates), removeDeviatedWorkouts),
							deletedDates: _.union(deletedDates, workout.deletedDates),
							weekly, startDate, endDate, notes
						},
						function (err) {
							res.status(200).json();
						})
						.setOptions({ omitUndefined: true });
				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});

	};
});

// @route POST api/workout/delete
// @desc Delete single workout by ID
// @access  Public
router.post('/delete', async (req, res) => {
	const { token, id } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json();
				} else {
					res.status(403).json();
				}
			} else {

				try {
					if (!id) {
						httpErr = 400
						throw Error('No id');
					}

					var workout = await Workout.findById(id);

					if (!workout) {
						httpErr = 404
						throw Error('Nonexistent Workout');
					}

					if (workout.userId != authData._id) {
						httpErr = 403;
						throw Error('Invalid credentials');
					}

					Workout.findByIdAndDelete(id,
						function (err) {
							res.status(200).json();
						});
				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});

// @route POST api/workout/markExercisesDone
// @desc Mark exercises done in a workout for a certain day
// @access  Public
router.post('/markExercisesDone', async (req, res) => {
	const { token, workout, date, addDoneExercises, removeDoneExercises } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json();
				} else {
					res.status(403).json();
				}
			} else {
				try {
					if (!workout || !date) {
						httpErr = 400
						throw Error('Missing required felids');
					}

					// Check for outside of workout date ranges?
					// Check if passed in exercises actually exist and belong to user
					// Check if passed in exercises belong to workout

					var completedExercises = await CompletedExercises.findOne({ workout: workout, date: date });

					// If it doesn't exist then create one
					if (!completedExercises) {

						var newCompletedExercises = new CompletedExercises({
							userId: authData._id,
							workout: workout,
							date: date,
							exercises: addDoneExercises
						});

						const savedCompletedExercises = await newCompletedExercises.save();

						if (!savedCompletedExercises) {
							httpErr = 500;
							throw Error('Something went wrong saving the user');
						} else {
							res.status(201).json()
						}
					} else if (completedExercises.userId != authData._id) {
						httpErr = 403;
						throw Error('Invalid credentials');
					} else {
						CompletedExercises.findOneAndUpdate({ workout: workout, date: date },
							{
								exercises: _.difference(_.union(addDoneExercises, completedExercises.doneDates), removeDoneExercises),
							},
							function (err) {
								res.status(200).json();
							})
							.setOptions({ omitUndefined: true });
					}
				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});

// @route POST api/workout/getDoneExercises
// @desc Get a list of exercise IDs that are done for a workout on a certain date
// @access  Public
router.post('/getDoneExercises', async (req, res) => {
	const { token, workout, date } = req.body;

	httpErr = 500;
	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, async (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json();
				} else {
					res.status(403).json();
				}
			} else {
				try {
					if (!workout || !date) {
						httpErr = 400
						throw Error('Missing required felids');
					}

					var completedExercises = await CompletedExercises.findOne({ workout: workout, date: date });

					if (!completedExercises) {
						res.status(200).json({ doneExercises: [] });
					}

					if (completedExercises.userId != authData._id) {
						httpErr = 403;
						throw Error('Invalid credentials');
					}

					res.status(200).json({ doneExercises: completedExercises.exercises });

				} catch (e) {
					res.status(httpErr).json({ err: e.message });
				}
			}
		});
	}
});


module.exports = router;