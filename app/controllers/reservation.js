'use strict';

import model from '../models';
import tokenHelper from '../helpers/token';
import moment from 'moment';

const ReservationController = {
	create: (req, res, next) => {
		try {
			const token = tokenHelper.getToken(req);
			const user_id = tokenHelper.getUserIdByToken(token);
			const data = req.body.data;
			const resevationDate = moment(data.reservationDate, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');
			model.reservation
				.create({
					user_id: user_id,
					barbershop_id: data.barbershopId,
					reservation_date: resevationDate,
					status: 1
				})
				.then((reservation) => {
					res.json({
						data: {
							reservation: reservation,
							status: 'success'
						}
					});
				})
				.catch((error) => {
					res.json({
						date: error
					});
				});
		} catch (error) {}
	}
};

module.exports = ReservationController;
