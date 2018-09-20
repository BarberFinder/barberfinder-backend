'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: DataTypes.STRING,
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			password: DataTypes.STRING,
			googleID: DataTypes.TEXT,
			facebookID: DataTypes.TEXT,
			birthday: DataTypes.DATEONLY
		},
		{
			tableName: 'user',
			timestamps: false
		}
	);
	User.associate = function(models) {
		User.belongsToMany(models.reservation, {
			through: 'reservation_user',
			foreignKey: 'user_id',
			otherKey: 'reservation_id'
		});
	};
	return User;
};
