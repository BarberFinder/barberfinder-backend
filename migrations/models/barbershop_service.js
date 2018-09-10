'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barbershop_Service = sequelize.define('Barbershop_Service', {
    service_name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    barbershop_id: DataTypes.INTEGER
  }, {});
  Barbershop_Service.associate = function(models) {
    // associations can be defined here
  };
  return Barbershop_Service;
};