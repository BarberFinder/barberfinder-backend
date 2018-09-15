'use strict';

import jwt from 'jsonwebtoken';
import model from '../models';

const AuthController = {
	verifyToken: async (req, res, next) => {
		const token = req.body.token;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
	}
};

module.exports = AuthController;
