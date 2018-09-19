'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user',
		{
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
		User.hasMany(models.reservation, { as: 'reservations', foreignKey: 'user_id' });
	};
	return User;
};
