const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Students extends Model {}

Students.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    studentsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentsEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    studentsRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentsPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Students',
    tableName: 'students',
  }
);

module.exports = Students;