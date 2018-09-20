'use strict';
module.exports = (sequelize, DataTypes) => {
	const Reservation = sequelize.define(
		'reservation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			barbershop_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'barbershop',
					key: 'id'
				}
			},
			reservation_date: DataTypes.DATE,
			reservation_time: DataTypes.TIME,
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'reservation_status',
					key: 'id'
				}
			}
		},
		{
			tableName: 'reservation',
			timestamps: false
		}
	);
	Reservation.associate = function(models) {
		Reservation.belongsTo(models.barbershop, {
			foreignKey: 'barbershop_id',
			targetKey: 'id'
		});
		Reservation.belongsTo(models.reservation_status, {
			foreignKey: 'status',
			targetKey: 'id'
		});
		Reservation.belongsToMany(models.user, {
			through: 'reservation_user',
			foreignKey: 'reservation_id',
			otherKey: 'user_id'
		});
	};
	return Reservation;
};
