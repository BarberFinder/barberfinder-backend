'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_barbershop = sequelize.define('user_barbershop', {
    user_id: DataTypes.INTEGER,
    barbershop_id: DataTypes.INTEGER
  }, {});
  user_barbershop.associate = function(models) {
    // associations can be defined here
  };
  return user_barbershop;
};