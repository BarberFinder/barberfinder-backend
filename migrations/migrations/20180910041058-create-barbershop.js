'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('barbershop', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			address: {
				type: Sequelize.STRING
			},
			city: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.BOOLEAN
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('barbershop');
	}
};
