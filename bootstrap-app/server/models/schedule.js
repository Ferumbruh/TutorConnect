// future development 

// const { DataTypes, Model } = require('sequelize');

// class Schedule extends Model {
//     constructor(ScheduleBooking) {
//         super();
//         this.scheduleBooking = scheduleBooking;
//     }
// }

// function ScheduleBooking(sequelize) {
//     Schedule.init({
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             allowNull: false,
//         },
//         scheduleTime: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//     }, {
//         sequelize,
//         modelName: 'Schedule', 
//     });

//     return Schedule;
// }

// module.exports = ScheduleBooking;