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
		// associations can be defined here
	};
	return User;
};
