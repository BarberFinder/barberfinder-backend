'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barbershop_Image = sequelize.define('Barbershop_Image', {
    url: DataTypes.STRING,
    barbershop_id: DataTypes.INTEGER
  }, {});
  Barbershop_Image.associate = function(models) {
    // associations can be defined here
  };
  return Barbershop_Image;
};