const barberHelper = {
	handleServices: (services, barber) => {
		let newServices = [];
		services.map((service) => {
			if (service.service_name.length > 0 && service) {
				newServices.push({
					service_name: service.service_name,
					price: service.price,
					barbershop_id: barber.id
				});
			}
		});
		return newServices;
	},
	handleOperationHours: (operation_hours, barber) => {
		let newOperationHours = [];
		operation_hours.map((operation_hour) => {
			newOperationHours.push({
				day: operation_hour.day,
				open_hour: operation_hour.open_hour,
				close_hour: operation_hour.close_hour,
				barbershop_id: barber.id
			});
		});
		return newOperationHours;
	}
};

module.exports = barberHelper;
