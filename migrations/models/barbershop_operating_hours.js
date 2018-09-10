'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barbershop_Operating_Hours = sequelize.define('Barbershop_Operating_Hours', {
    day: DataTypes.INTEGER,
    open_hour: DataTypes.TIME,
    close_hour: DataTypes.TIME,
    barbershop_id: DataTypes.INTEGER
  }, {});
  Barbershop_Operating_Hours.associate = function(models) {
    // associations can be defined here
  };
  return Barbershop_Operating_Hours;
};