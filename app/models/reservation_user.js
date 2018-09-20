'use strict';
module.exports = (sequelize, DataTypes) => {
	const Reservation_User = sequelize.define(
		'reservation_user',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			reservation_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'reservation',
					key: 'id'
				}
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'user',
					key: 'id'
				}
			}
		},
		{
			tableName: 'reservation_user',
			timestamps: false
		}
	);
	Reservation_User.associate = function(models) {
		Reservation_User.belongsTo(models.user, {
			foreignKey: 'user_id',
			targetKey: 'id'
		});
	};
	return Reservation_User;
};
