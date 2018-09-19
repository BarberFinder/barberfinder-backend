'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('barbershop', 'tagline', {
			type: Sequelize.STRING,
			allowNull: true
		});
	},
	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('barbershop', 'tagline');
	}
};
