'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('barbershop_images', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			url: {
				type: Sequelize.STRING
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
		return queryInterface.dropTable('barbershop_images');
	}
};
