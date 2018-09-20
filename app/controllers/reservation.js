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
					barbershop_id: data.barbershopId,
					reservation_date: resevationDate,
					status: 1
				})
				.then((reservation) => {
					model.reservation_user
						.create({
							user_id: user_id,
							reservation_id: reservation.id
						})
						.then((reservation_user) => {
							res.json({
								data: {
									reservation: reservation_user,
									status: 'success'
								}
							});
						});
				})
				.catch((error) => {
					res.json({
						date: error
					});
				});
		} catch (error) {}
	},
	getReservationByBarberShopId: (req, res, next) => {
		const token = tokenHelper.getToken(req);
		const user_id = tokenHelper.getUserIdByToken(token);

		try {
			model.barbershop
				.findOne({
					where: {
						user_id: user_id
					}
				})
				.then((barbershop) => {
					model.reservation
						.findAll({
							where: {
								barbershop_id: barbershop.id
							}
						})
						.then((reservation) => {
							// model.user.findOne({
							// 	where: {
							// 		user_id: reservation.user_id
							// 	}
							// }).then((user) =>{
							// 	res.json({
							// 		data: {
							// 			user: user,
							// 			reservations: reservation
							// 		}
							// 	})
							// })
						});
				});
		} catch (error) {
			console.log(error);
		}
	}
};

module.exports = ReservationController;
