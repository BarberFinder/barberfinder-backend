'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('barbershop', 'phone', {
			type: Sequelize.STRING,
			allowNull: true
		});
	},
	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('barbershop', 'phone');
	}
};
