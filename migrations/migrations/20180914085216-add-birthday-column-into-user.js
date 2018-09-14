'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('user', 'birthday', {
			type: Sequelize.DATE
		});
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('user', 'birthday');
	}
};
