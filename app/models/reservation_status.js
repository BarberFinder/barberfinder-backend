'use strict';
module.exports = (sequelize, DataTypes) => {
	const Reservation_Status = sequelize.define(
		'reservation_status',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: DataTypes.STRING
		},
		{
			tableName: 'reservation_status',
			timestamps: false
		}
	);
	Reservation_Status.associate = function(models) {
		Reservation_Status.hasMany(models.reservation, { as: 'reservation_status', foreignKey: 'status' });
	};
	return Reservation_Status;
};
