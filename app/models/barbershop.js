'use strict';
module.exports = (sequelize, DataTypes) => {
	const Barbershop = sequelize.define(
		'barbershop',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			city: DataTypes.STRING,
			phone: DataTypes.STRING,
			status: DataTypes.BOOLEAN,
			tagline: DataTypes.STRING,
			user_id: DataTypes.INTEGER,
			image: DataTypes.STRING
		},
		{
			tableName: 'barbershop',
			timestamps: false
		}
	);
	Barbershop.associate = function(models) {
		Barbershop.hasMany(models.barbershop_services, { as: 'services', foreignKey: 'barbershop_id' });
		Barbershop.hasMany(models.barbershop_operating_hours, { as: 'operation_hours', foreignKey: 'barbershop_id' });
	};
	return Barbershop;
};
