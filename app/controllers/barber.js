'use strict';

import model from '../models';
import sequelize from '../connection/sequelize';
import tokenHelper from '../helpers/token';
import barberHelper from '../helpers/barber';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const BarberController = {
	create: (req, res, next) => {
		const token = tokenHelper.getToken(req);
		const user_id = tokenHelper.getUserIdByToken(token);
		const data = req.body.data;
		const services = data.services;
		const operation_hours = data.operation_hours;

		let barbershop = '';
		try {
			sequelize
				.transaction((t) => {
					return model.barbershop
						.create(
							{
								name: data.name,
								address: data.address,
								tagline: data.tagline,
								city: data.city,
								phone: data.phone,
								status: true,
								user_id: user_id
							},
							{ transaction: t }
						)
						.then((barber) => {
							let newServices = barberHelper.handleServices(services, barber);
							let newOperationHours = barberHelper.handleOperationHours(operation_hours, barber);
							model.barbershop_services.bulkCreate(newServices), { transaction: t };
							model.barbershop_operating_hours.bulkCreate(newOperationHours), { transaction: t };
							barbershop = barber;
						});
				})
				.then((result) => {
					res.json({
						barber: barbershop.get({
							plain: true
						})
					});
				})
				.catch((err) => {
					res.json({
						message: err
					});
				});
		} catch (error) {
			res.json({
				message: error
			});
		}
	},
	get: (req, res, next) => {
		try {
			const token = tokenHelper.getToken(req);
			let user_id = 0;
			if (token) {
				user_id = tokenHelper.getUserIdByToken(token);
			}
			if (user_id > 0) {
				model.barbershop
					.find({
						where: {
							user_id: user_id,
							status: true
						},
						include: [
							{
								model: model.barbershop_services,
								as: 'services',
								attributes: [ 'id', 'service_name', 'price' ]
							},
							{
								model: model.barbershop_operating_hours,
								as: 'operation_hours',
								attributes: [ 'id', 'day', 'open_hour', 'close_hour' ]
							}
						]
					})
					.then((result) => {
						res.json({
							data: result
						});
					})
					.catch((err) => {
						res.json({
							message: err
						});
					});
			}
		} catch (error) {
			res.json({
				message: error
			});
		}
	},
	getBarberShopList: (req, res, next) => {
		try {
			const token = tokenHelper.getToken(req);
			let user_id = 0;
			if (token) {
				user_id = tokenHelper.getUserIdByToken(token);
			}
			model.barbershop
				.findAll({
					where: {
						user_id: {
							[Op.not]: user_id
						}
					}
				})
				.then((barbers) => {
					res.json({
						data: barbers
					});
				})
				.catch((err) => {
					res.json({
						data: err
					});
				});
		} catch (error) {}
	}
};

module.exports = BarberController;
