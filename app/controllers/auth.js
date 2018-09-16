'use strict';

import jwt from 'jsonwebtoken';
import model from '../models';

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
							isAuthenticated: true
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
};

module.exports = AuthController;
