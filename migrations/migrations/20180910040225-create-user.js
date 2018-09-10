'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				type: Sequelize.STRING
			},
			first_name: {
				type: Sequelize.STRING
			},
			last_name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			phone: {
				type: Sequelize.STRING
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user');
	}
};
