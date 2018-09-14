'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('user', 'password', {
			type: Sequelize.STRING
		}),
			queryInterface.addColumn('user', 'googleID', {
				type: Sequelize.TEXT
			}),
			queryInterface.addColumn('user', 'facebookID', {
				type: Sequelize.TEXT
			});
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('user', 'password'),
			queryInterface.removeColumn('user', 'googleID'),
			queryInterface.removeColumn('user', 'facebookID');
	}
};
