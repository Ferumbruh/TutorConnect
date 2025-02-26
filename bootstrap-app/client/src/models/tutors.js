const { DataTypes, Model } = require('sequelize');

class Tutors extends Model {}

function TutorsInfo(sequelize) {
    Tutors.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
    }, {
        sequelize,
        modelName: 'Tutors', 
        tableName: 'tutors',
    });

    return Tutors;
}

module.exports = (sequelize) => TutorsInfo(sequelize);