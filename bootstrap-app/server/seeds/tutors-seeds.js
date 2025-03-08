const { Tutors } = require('../models');

const seedTutorsInfo = async () => {
  await Tutors.bulkCreate(
    [
      {  tutorsName: 'Kim', email: 'kim@example.com', password: 'school', tutorsRole: 'tutor' }
    ],
    { individualHooks: true }
  );
};

module.exports = seedTutorsInfo;