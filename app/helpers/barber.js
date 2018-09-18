const barberHelper = {
	handleServices: (services, barber) => {
		let newServices = [];
		services.map((service) => {
			newServices.push({
				service_name: service.service_name,
				price: service.service_price,
				barbershop_id: barber.id
			});
		});
		return newServices;
	},
	handleOperationHours: (operation_hours, barber) => {
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
	}
};

module.exports = barberHelper;
