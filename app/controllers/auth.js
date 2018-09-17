'use strict';

import jwt from 'jsonwebtoken';
import model from '../models';
import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';

const SALT_WORK_FACTOR = 10;
const AuthController = {
	verifyToken: async (req, res, next) => {
		const token = req.body.token;
		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			await model.user
				.findOne({
					where: { id: decoded.id }
				})
				.then((user) => {
					if (user) {
						res.json({
							isAuthenticated: true,
							user: {
								first_name: user.first_name,
								last_name: user.last_name
							}
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},
	signup: (req, res, next) => {
		const user = req.body;
		const email = user.email;
		const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

		model.user
			.findOrCreate({
				where: { email: email },
				defaults: {
					username: user.username,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					phone: user.phone,
					birthday: user.birthday,
					password: bcrypt.hashSync(user.password, salt)
				}
			})
			.spread((user, created) => {
				let userProfile = user.get({
					plain: true
				});

				const jwtPaylod = { id: userProfile.id };
				const token = jwt.sign(jwtPaylod, process.env.JWT_SECRET, { expiresIn: '7d' });
				res.json({ token: token });
			});
	},
	login: async (req, res, next) => {
		const Op = Sequelize.Op;
		const user = req.body.user;
		const emailOrUsername = user.email;
		const password = user.password;
		try {
			let user = await model.user
				.findOne({
					where: {
						[Op.or]: [ { username: emailOrUsername }, { email: emailOrUsername } ]
					}
				})
				.then((user) => user);
			if (user === null) {
				return res.json({
					data: {
						message: 'Invalid email or username',
						token: ''
					}
				});
			}

			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.json({
					data: {
						message: 'Invalid password',
						token: ''
					}
				});
			}

			const jwtPaylod = { id: user.id };
			const token = jwt.sign(jwtPaylod, process.env.JWT_SECRET, { expiresIn: '7d' });
			return res.json({
				data: {
					message: '',
					token: token
				}
			});
		} catch (error) {
			res.json({
				data: 'error',
				error: error
			});
		}
	}
};

module.exports = AuthController;
