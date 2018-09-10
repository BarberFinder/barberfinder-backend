'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation_Status = sequelize.define('Reservation_Status', {
    name: DataTypes.STRING
  }, {});
  Reservation_Status.associate = function(models) {
    // associations can be defined here
  };
  return Reservation_Status;
};