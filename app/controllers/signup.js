'use strict';

import model from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_WORK_FACTOR = 10;

const SignupController = {
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
	}
};

module.exports = SignupController;
