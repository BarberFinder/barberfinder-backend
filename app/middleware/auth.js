'use strict';

import tokenHelper from '../helpers/token';
import model from '../models';
import jwt from 'jsonwebtoken';

const auth = {
	isAuthenticated: async (req, res, next) => {
		const token = tokenHelper.getToken(req);
		if (token === undefined) {
			return res.json({
				message: 'Token not found'
			});
		}

		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			await model.user
				.findOne({
					where: { id: decoded.id }
				})
				.then((user) => {
					if (!user) {
						return res.json({
							message: 'No user is associated with that token'
						});
					}
					next();
				})
				.catch((err) => {
					return res.json({
						message: 'Token is not valid'
					});
				});
		});
	}
};

module.exports = auth;
