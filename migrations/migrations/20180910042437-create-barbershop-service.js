'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('barbershop_services', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			service_name: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.DECIMAL
			},
			barbershop_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'barbershop',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('barbershop_services');
	}
};
