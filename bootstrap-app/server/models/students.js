const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class Students extends Model {
  async checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

Students.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'students',
    hooks: {
    
      beforeCreate: async (student) => {
        student.password = await bcrypt.hash(student.password, 10);
      },
      beforeUpdate: async (student) => {
        if (student.changed('password')) {
          student.password = await bcrypt.hash(student.password, 10);
        }
      },
    },
  }
);

module.exports = Students;