'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    user_id: DataTypes.INTEGER,
    barbershop_id: DataTypes.INTEGER,
    reservatio_date: DataTypes.DATE,
    reservation_time: DataTypes.TIME,
    status: DataTypes.INTEGER
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
  };
  return Reservation;
};