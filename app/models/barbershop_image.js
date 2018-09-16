'use strict';
module.exports = (sequelize, DataTypes) => {
	const Barbershop_Image = sequelize.define(
		'barbershop_images',
		{
			url: DataTypes.STRING,
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
			tableName: 'barbershop_images',
			timestamps: false
		}
	);
	Barbershop_Image.associate = function(models) {
		Barbershop_Image.belongsTo(models.barbershop, {
			foreignKey: 'barbershop_id',
			targetKey: 'id'
		});
	};
	return Barbershop_Image;
};
