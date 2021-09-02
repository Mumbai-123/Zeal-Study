import express from "express";
const router = express.Router();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validateRegisterData from "../auth/register.js";
import validateLoginData from "../auth/login.js";
import validatechangePassword from "../auth/changePassword.js";

import User from "../models/User.js";

router.post("/register", async (req, res) => {
	//form validation

	const { errors, isValid } = validateRegisterData(req.body);

	if (!isValid) {
		return res.status(404).send(errors);
	}

	User.findOne({ username: req.body.username }).then(async (user) => {
		if (user) {
			return res
				.status(400)
				.send({ username: "Account already registered with this username" });
		} else {
			const newUser = new User({
				username: req.body.username,
				password: req.body.password,
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						console.log(err);
					}
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login teacher and return JWT token
// @access Public
router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginData(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).send(errors);
	}

	const username = req.body.username;

	const password = req.body.password;

	User.findOne({ username }).then((user) => {
		if (!user) {
			return res.status(404).send({ username: "Account not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					username: user.username,
				}; // Sign token
				jwt.sign(
					payload,
					process.env.secretOrKey,
					{
						expiresIn: 86400, // 1 day in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							name: user.name,
							token: "Bearer " + token,
						});
					}
				);
			} else {
				return res.status(400).send({ password: "Incorrect password" });
			}
		});
	});
});

router.post("/changePassword", (req, res) => {
	// Form validation
	const { errors, isValid } = validatechangePassword(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).send(errors);
	}

	const username = req.body.username;

	const password = req.body.oldPassword;

	User.findOne({ username }).then((user) => {
		if (!user) {
			return res.status(404).send({ username: "Account not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched

        bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
						if (err) {
							console.log(err);
						}
						user.password = hash;
						user
							.save()
							.then((user) => res.json(user))
							.catch((err) => console.log(err));
					});
				});
				
			} else {
				return res.status(400).send({ password: "Incorrect password" });
			}
		});
	});
});

export default router;
