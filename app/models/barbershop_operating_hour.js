'use strict';
module.exports = (sequelize, DataTypes) => {
	const Barbershop_Operating_Hours = sequelize.define(
		'barbershop_operating_hours',
		{
			day: DataTypes.INTEGER,
			open_hour: DataTypes.TIME,
			close_hour: DataTypes.TIME,
			barbershop_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'barbershop',
					key: 'id'
				}
			}
		},
		{
			tableName: 'barbershop_operating_hours',
			timestamps: false
		}
	);
	Barbershop_Operating_Hours.associate = function(models) {
		Barbershop_Operating_Hours.belongsTo(models.barbershop, {
			foreignKey: 'barbershop_id',
			targetKey: 'id'
		});
	};
	return Barbershop_Operating_Hours;
};
