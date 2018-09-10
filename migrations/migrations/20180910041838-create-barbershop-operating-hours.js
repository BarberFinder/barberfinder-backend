'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('barbershop_operating_hours', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			day: {
				type: Sequelize.INTEGER
			},
			open_hour: {
				type: Sequelize.TIME
			},
			close_hour: {
				type: Sequelize.TIME
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
		return queryInterface.dropTable('barbershop_operating_hours');
	}
};
