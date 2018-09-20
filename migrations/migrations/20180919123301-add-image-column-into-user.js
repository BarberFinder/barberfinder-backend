'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('user', 'image', {
			type: Sequelize.STRING,
			allowNull: true
		});
	},
	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('user', 'image');
	}
};
