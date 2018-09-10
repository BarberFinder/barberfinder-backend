'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('reservation', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			barbershop_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'barbershop',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			reservation_date: {
				type: Sequelize.DATE
			},
			reservation_time: {
				type: Sequelize.TIME
			},
			status: {
				type: Sequelize.INTEGER,
				references: {
					model: 'reservation_status',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('reservation');
	}
};
