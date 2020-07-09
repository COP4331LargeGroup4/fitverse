const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const nodemailer = require('nodemailer');
const senderemail = 'fitverse123@gmail.com';
const senderpassword = 'w_u`d(.ZXP`SQ5fz';


// User model
const User = require('../../models/user');
const jwtConfig = require('./Config/jwtConfig');

// Email Template
var smtpTransport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: senderemail,
		pass: senderpassword
	}
});

function forgotPasswordText(name, token) {
	const url = 'https://fitverse.herokuapp.com/resetpassword?token=' + token;
	return (`Dear `+ name + `,
			You requested for a password reset, kindly navigate to ` + url + ` to reset your password.
			Cheers!`
	)
}

function forgotPasswordEmail(name, token) {
	const url = 'https://fitverse.herokuapp.com/resetpassword?token=' + token;
	return (`<div>
			<h3>Dear `+ name + `,</h3>
			<p>You requested for a password reset, kindly use this <a href=` + url + `>link</a> to reset your password</p>
			<br>
			<p>Cheers!</p>
			</div>`
	)
}

function verifyText(name, token) {
	const url = 'https://fitverse.herokuapp.com/verify?token=' + token;
	return (`Dear `+ name + `,
			Please verify your email, kindly navigate to ` + url + ` to reset your password.
			Cheers!`
	)
}

function verifyEmail(name, token) {
	const url = 'https://fitverse.herokuapp.com/verify?token=' + token;
	return (`<div>
			<h3>Dear `+ name + `,</h3>
			<p>Please verify your email, kindly use this <a href=` + url + `>link</a> to reset your password</p>
			<br>
			<p>Cheers!</p>
			</div>`
	)
}






// @route POST api/user/login
// @desc login user
// @access  Public
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		User.findOne({ email: email },
			async function (err, user) {
				try {
					if (!user) throw Error('User does not exist');

					const match = await bcrypt.compare(password, user.password);
					if (!match) throw Error('Invalid credentials');

					jwt.sign({ _id: user._id }, jwtConfig.secretKey, { expiresIn: jwtConfig.timeout }, (err, token) => {
						res.status(200).json({
							token,

							user: {
								firstName: user.firstName,
								lastName: user.lastName,
							}
						});
					});
				} catch (e) {
					res.status(400).json({ err: e.message });
				}
			});
	} catch (e) {
		res.status(400).json({ err: e.message });
	}
});

// @route POST api/user/signup
// @desc register user
// @access  Public
router.post('/signup', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Simple validation
	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Create User
	try {
		User.findOne({ email: email },
			async function (err, user) {
				try {
					if (user) throw Error('User already exists');

					const salt = await bcrypt.genSalt(10);
					if (!salt) throw Error('Bcrypt salt error');

					const hash = await bcrypt.hash(password, salt);
					if (!hash) throw Error('Bcrypt hash error');

					const newUser = new User({
						firstName,
						lastName,
						email,
						password: hash,
						emailVerified: false,
						emailVerificationToken: crypto.randomBytes(10).toString('hex'),
						emailVerificationTokenExp: Math.round((new Date()).getTime() / 1000) + 43200
					});

					var emaildata = {
						to: newUser.email,
						from: senderemail,
						subject: 'Fitverse email verification',
						text: verifyText(newUser.firstName + ' ' + newUser.lastName, newUser.emailVerificationToken),
						html: verifyEmail(newUser.firstName + ' ' + newUser.lastName, newUser.emailVerificationToken)
					};
				
					await smtpTransport.sendMail(emaildata);

					const savedUser = await newUser.save();
					if (!savedUser) throw Error('Something went wrong saving the user');

					jwt.sign({ _id: savedUser._id }, jwtConfig.secretKey, { expiresIn: jwtConfig.timeout }, (err, token) => {
						res.status(200).json({
							token,

							user: {
								firstName: savedUser.firstName,
								lastName: savedUser.lastName,
							}
						});
					});

				} catch (e) {
					res.status(400).json({ err: e.message });
				}
			});
	} catch (e) {
		res.status(400).json({ err: e.message });
	}

	//TODO: Actually Send email
	jwt.sign({ email }, jwtConfig.secretKey, { expiresIn: jwtConfig.timeout }, (err, token) => {
		// Send the email using the token string
	});
});

router.post('/resendVerification', async (req, res) => {
	try {
		var user;
		if (req.body.token != null)
		{
			user = await User.find({ emailVerificationToken: req.body.token });
		}
		else if (req.body.email != null)
		{
			user = await User.find({ email: req.body.email });
		}

		if (user.length != 1) throw Error('User not found');

		user = user[0];

		user = await User.findByIdAndUpdate(
			{_id: user._id}, 
			{
				emailVerificationToken: crypto.randomBytes(10).toString('hex'),
				emailVerificationTokenExp: Math.round((new Date()).getTime() / 1000) + 43200
			});

		var emaildata = {
			to: user.email,
			from: senderemail,
			subject: 'Fitverse email verification',
			text: verifyText(user.firstName + ' ' + user.lastName, user.emailVerificationToken),
			html: verifyEmail(user.firstName + ' ' + user.lastName, user.emailVerificationToken)
		};
	
		await smtpTransport.sendMail(emaildata);
	
		res.status(200).json({msg:"Success, Check email for next steps"});
	}
	catch (e) {
		console.log(e.message);
		res.status(400).json({ err: e.message });
	}
})

router.post('/verify', async (req, res) => {
	try {
		var user = await User.find({ emailVerificationToken: req.body.token });

		if (user.length != 1) throw Error('Token not found');

		user = user[0];

		if (user.emailVerificationTokenExp < Math.round((new Date()).getTime() / 1000))
		{
			throw Error('Token Expired');
		} 
		
		user = await User.findByIdAndUpdate(
			{_id: user._id}, 
			{
				emailVerified: true,
				emailVerificationToken: null, 
				emailVerificationTokenExp: null,
			});



		res.status(200).json({msg:"success"});
	}
	catch (e) {
		console.log(e.message);
		res.status(400).json({ err: e.message });
	}
});

// @route DELETE api/deleteAccount
// @desc delete account
router.post('/deleteAccount', async (req, res) => {
	const { password, token } = req.body;

	if (!token) {
		res.status(403).json();
	} else {
		jwt.verify(token, jwtConfig.secretKey, (err, authData) => {
			if (err) {
				if (err.name == "TokenExpiredError") {
					res.status(401).json()
				} else {
					res.status(403).json()
				}
			} else {
				try {
					User.findById(authData._id,
						async function (err, user) {
							try {
								if (!user) throw Error('User does not exist');

								const match = await bcrypt.compare(password, user.password);
								if (!match) throw Error('Invalid credentials');

								User.findByIdAndDelete(user._id,
									function (err) {
										res.status(200).json({
											msg: "user deleted"
										});
									});
							} catch (e) {
								res.status(400).json({ err: e.message });
							}
						});
				} catch (e) {
					res.status(400).json({ err: e.message });
				}
			}
		});
	}
});

router.post('/forgotPassword', async (req, res) => {
	try {
		var user = await User.find({ email: req.body.email });

		if (user.length != 1) throw Error('User not found');

		user = user[0];

		user = await User.findByIdAndUpdate(
			{_id: user._id}, 
			{
				passwordResetToken: crypto.randomBytes(10).toString('hex'), 
				passwordResetTokenExp: Math.round((new Date()).getTime() / 1000) + 43200
			});

		user = await User.find({ email: req.body.email });
		user = user[0];

		var emaildata = {
			to: user.email,
			from: senderemail,
			subject: 'Fitverse password reset',
			text: forgotPasswordText(user.firstName + ' ' + user.lastName, user.passwordResetToken),
			html: forgotPasswordEmail(user.firstName + ' ' + user.lastName, user.passwordResetToken)
		};

		await smtpTransport.sendMail(emaildata);

		res.status(200).json({msg:"Success, Check email for next steps"});
	}
	catch (e) {
		console.log(e.message);
		res.status(400).json({ err: e.message });
	}

});

router.post('/resetPassword', async (req, res) => {
	try {
		var user = await User.find({ passwordResetToken: req.body.token });

		if (user.length != 1) throw Error('Token not found');

		user = user[0];

		var id = user._id;

		if (user.passwordResetTokenExp < Math.round((new Date()).getTime() / 1000)) throw Error('Token Expired');

		const salt = await bcrypt.genSalt(10);
		if (!salt) throw Error('Bcrypt salt error');

		const hash = await bcrypt.hash(req.body.password, salt);
		if (!hash) throw Error('Bcrypt hash error');

		user = await User.findByIdAndUpdate(
			{_id: user._id}, 
			{
				password: hash,
				passwordResetToken: null, 
				passwordResetTokenExp: null,
			});

		res.status(200).json({msg:"Password has been updated successfully"});
	}
	catch (e) {
		console.log(e.message);
		res.status(400).json({ err: e.message });
	}
});

module.exports = router;