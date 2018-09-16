'use strict';

const tokenHelper = {
	getToken: (req) => {
		const token =
			req.body.token ||
			req.query.token ||
			(req.headers.authorization && req.headers.authorization.split(' ')[1]) ||
			undefined;
		return token;
	}
};

module.exports = tokenHelper;
