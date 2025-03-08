const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class Tutors extends Model {
  async checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

Tutors.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'tutors',
    tableName: 'tutors',
    hooks: {
      beforeCreate: async (tutor) => {
        tutor.password = await bcrypt.hash(tutor.password, 10);
      },
      beforeUpdate: async (tutor) => {
        if (tutor.changed('password')) {
          tutor.password = await bcrypt.hash(tutor.password, 10);
        }
      },
    },
  }
);

module.exports = Tutors;