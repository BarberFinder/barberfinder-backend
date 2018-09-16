'use strict';

import jwt from 'jsonwebtoken';

const tokenHelper = {
	getToken: (req) => {
		const token =
			req.body.token ||
			req.query.token ||
			(req.headers.authorization && req.headers.authorization.split(' ')[1]) ||
			undefined;
		return token;
	},
	getUserIdByToken: (token) => {
		let user_id = 0;
		if (token) {
			let decoded = jwt.verify(token, process.env.JWT_SECRET);
			user_id = decoded.id;
		}
		return user_id;
	}
};

module.exports = tokenHelper;
