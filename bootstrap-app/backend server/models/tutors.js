const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Tutors extends Model {}

Tutors.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tutorsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorsEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tutorsPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorsRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tutors',
    tableName: 'tutors',
  }
);

module.exports = Tutors;