'use strict';

import model from '../models';
import tokenHelper from '../helpers/token';

const UserController = {
	getCurrentUser: (req, res, next) => {
		try {
			const token = tokenHelper.getToken(req);
			let user_id = 0;
			if (token) {
				user_id = tokenHelper.getUserIdByToken(token);
			}

			console.log(user_id);

			if (user_id > 0) {
				model.user
					.findOne({
						where: {
							id: user_id
						},
						attributes: [
							'id',
							'username',
							'first_name',
							'last_name',
							'email',
							'phone',
							'birthday',
							'image'
						]
					})
					.then((result) => {
						res.json({
							data: result
						});
					})
					.catch((error) => {
						res.json({
							data: error,
							message: 'Something error'
						});
					});
			} else {
				res.json({
					message: 'User not found'
				});
			}
		} catch (error) {}
	}
};

module.exports = UserController;
