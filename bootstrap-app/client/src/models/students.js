const { DataTypes, Model } = require('sequelize');

class Students extends Model {}

function StudentsInfo(sequelize) {
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

    return Students;
}

module.exports = (sequelize) => StudentsInfo(sequelize);
