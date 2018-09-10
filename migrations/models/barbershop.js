'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barbershop = sequelize.define('Barbershop', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Barbershop.associate = function(models) {
    // associations can be defined here
  };
  return Barbershop;
};