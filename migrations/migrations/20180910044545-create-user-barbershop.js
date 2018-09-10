'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user_barbershop', {
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
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_barbershop');
	}
};
