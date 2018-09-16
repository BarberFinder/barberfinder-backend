'use strict';
module.exports = (sequelize, DataTypes) => {
	const Barbershop = sequelize.define(
		'barbershop',
		{
			// id: {
			// 	type: DataTypes.INTEGER,
			// 	primaryKey: true,
			// 	allowNull: false
			// },
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			city: DataTypes.STRING,
			status: DataTypes.BOOLEAN,
			tagline: DataTypes.STRING,
			user_id: DataTypes.INTEGER
		},
		{
			tableName: 'barbershop',
			timestamps: false
		}
	);
	Barbershop.associate = function(models) {};
	return Barbershop;
};
