'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('user', 'reservation_user_id', {
			type: Sequelize.INTEGER
		});
	},
	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('user', 'image');
	}
};
