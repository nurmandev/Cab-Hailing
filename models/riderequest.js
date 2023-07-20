'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RideRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RideRequest.init({
    userID: DataTypes.INTEGER,
    dateAndTime: DataTypes.DATE,
    rideType: DataTypes.STRING,
    pickupLocation: DataTypes.STRING,
    dropOffLocation: DataTypes.STRING,
    estimateFare: DataTypes.INTEGER,
    noOfPassengers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RideRequest',
  });
  return RideRequest;
};