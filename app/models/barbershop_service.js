'use strict';
module.exports = (sequelize, DataTypes) => {
	const Barbershop_Service = sequelize.define(
		'barbershop_services',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			service_name: DataTypes.STRING,
			price: DataTypes.DECIMAL,
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
			tableName: 'barbershop_services',
			timestamps: false
		}
	);
	Barbershop_Service.associate = function(models) {
		Barbershop_Service.belongsTo(models.barbershop, {
			foreignKey: 'barbershop_id',
			targetKey: 'id'
		});
	};
	return Barbershop_Service;
};
