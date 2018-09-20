'use strict';

import model from '../models';
import sequelize from '../connection/sequelize';
import tokenHelper from '../helpers/token';
import barberHelper from '../helpers/barber';
import Sequelize from 'sequelize';
import fs from 'fs';

const Op = Sequelize.Op;

const BarberController = {
	create: (req, res, next) => {
		try {
			const token = tokenHelper.getToken(req);
			const user_id = tokenHelper.getUserIdByToken(token);
			const stringData = req.body.data;
			const data = JSON.parse(stringData);
			const services = data.services;
			const operation_hours = data.operation_hours;
			let barbershop = '';
			let newFile = '';
			if (req.file !== undefined) {
				newFile = `images/${req.file.filename}`;
			}
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
								user_id: user_id,
								image: newFile
							},
							{ transaction: t }
						)
						.then((barber) => {
							let newServices = barberHelper.handleServices(services, barber);
							let newOperationHours = barberHelper.handleOperationHours(operation_hours, barber);
							model.barbershop_services.bulkCreate(newServices);
							model.barbershop_operating_hours
								.bulkCreate(newOperationHours)
								.then(() => {}, { transaction: t })
								.catch((err) => {
									console.log(err);
								});
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
			console.log(error);
			res.json({
				message: error
			});
		}
	},
	getBarberShopByUserId: (req, res, next) => {
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
						limit: 10,
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
			console.log(error);
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
			if (user_id > 0) {
				model.barbershop
					.findAll({
						limit: 10,
						where: {
							user_id: {
								[Op.not]: user_id
							}
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
			} else {
				model.barbershop
					.findAll({
						limit: 10,
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
			}
		} catch (error) {
			res.json({
				data: error
			});
		}
	},
	getBarberShopById: (req, res, next) => {
		const barbershopId = req.params.barbershopId;
		try {
			model.barbershop
				.find({
					where: {
						id: barbershopId,
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
				.then((barber) => {
					res
						.json({
							data: barber
						})
						.catch((err) => {
							res.json({
								data: err
							});
						});
				});
		} catch (error) {
			console.log(error);
		}
	},
	changeImage: (req, res, next) => {
		const token = tokenHelper.getToken(req);
		const user_id = tokenHelper.getUserIdByToken(token);
		let previousProfileImage = '';
		try {
			if (req.file == undefined) {
				res.json({
					message: 'Error: No File Selected!',
					status: 'error'
				});
			} else {
				let newFile = `images/${req.file.filename}`;
				model.barbershop
					.findOne({
						where: {
							user_id: user_id
						}
					})
					.then((barbershop) => {
						if (barbershop) {
							if (barbershop.image !== null) {
								previousProfileImage = `${process.env.IMAGE_FOLDER}/${barbershop.image}`;
							}
							barbershop
								.update({
									image: newFile
								})
								.then((updated_barbershop) => {
									if (fs.existsSync(previousProfileImage)) {
										fs.unlinkSync(previousProfileImage);
									}
									res.json({
										barber: updated_barbershop,
										message: 'update success',
										status: 'succces'
									});
								})
								.catch((err) => {
									res.json({
										message: err,
										status: 'failed'
									});
								});
						}
					})
					.catch((err) => {
						res.json({
							err: err
						});
					});
			}
		} catch (error) {
			res.json({
				data: error
			});
		}
	},
	edit: (req, res, next) => {
		try {
			const barbershopId = req.params.barbershopId;
			const data = JSON.parse(req.body.data);
			const services = data.services;
			const operation_hours = data.operation_hours;

			return sequelize
				.transaction(async (t) => {
					return await model.barbershop
						.findOne(
							{
								where: {
									id: barbershopId
								}
							},
							{ transaction: t }
						)
						.then(async (barbershop) => {
							if (barbershop) {
								await model.barbershop
									.update(
										{
											name: data.name,
											tagline: data.tagline,
											phone: data.phone,
											address: data.address,
											city: data.city
										},
										{
											where: {
												id: barbershopId
											}
										},
										{ transaction: t }
									)
									.then(() => {
										model.barbershop_services
											.destroy(
												{
													where: {
														barbershop_id: barbershopId
													}
												},
												{ transaction: t }
											)
											.then(() => {
												let newServices = barberHelper.handleServices(services, barbershop);
												model.barbershop_services.bulkCreate(newServices);
											});
										model.barbershop_operating_hours
											.destroy(
												{
													where: {
														barbershop_id: barbershopId
													}
												},
												{ transaction: t }
											)
											.then(() => {
												let newOperationHours = barberHelper.handleOperationHours(
													operation_hours,
													barbershop
												);
												model.barbershop_operating_hours.bulkCreate(newOperationHours);
											});
									});
							}
						});
				})
				.then((result) => {
					res.json({
						message: 'Successfully updated',
						status: 'success'
					});
				})
				.catch((err) => {
					res.json({
						message: 'Fail updated',
						status: 'failed'
					});
				});
		} catch (error) {
			res.json({
				message: error,
				status: 'failed'
			});
		}
	}
};

module.exports = BarberController;
