'use strict';

import model from '../models';
import sequelize from '../connection/sequelize';
import jwt from 'jsonwebtoken';
import tokenHelper from '../helpers/token';

const BarberController = {
	create: (req, res, next) => {
		const token = tokenHelper.getToken(req);
		let user_id = 0;
		if (token) {
			let decoded = jwt.verify(token, process.env.JWT_SECRET);
			user_id = decoded.id;
		}
		const data = req.body.data;
		const services = data.services;
		const operation_hours = data.operation_hours;

		const handleServices = (services, barber) => {
			let newServices = [];
			services.map((service) => {
				if (service.service_name.length > 0 && service.service_price.length > 0) {
					newServices.push({
						service_name: service.service_name,
						price: service.service_price,
						barbershop_id: barber.id
					});
				}
			});
			return newServices;
		};

		const handleOperationHours = (operation_hours, barber) => {
			let newOperationHours = [];
			operation_hours.map((operation_hour) => {
				if (operation_hour.day && operation_hour.open_time.length > 0 && operation_hour.close_time.length > 0) {
					newOperationHours.push({
						day: operation_hour.day,
						open_hour: operation_hour.open_time,
						close_hour: operation_hour.close_time,
						barbershop_id: barber.id
					});
				}
			});
			return newOperationHours;
		};

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
								status: true,
								user_id: user_id
							},
							{ transaction: t }
						)
						.then((barber) => {
							let newServices = handleServices(services, barber);
							let newOperationHours = handleOperationHours(operation_hours, barber);
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
	}
};

module.exports = BarberController;
