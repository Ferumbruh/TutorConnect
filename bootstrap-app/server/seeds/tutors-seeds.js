const { Tutors } = require('../models');

const seedTutorsInfo = async () => {
  await Tutors.bulkCreate(
    [
      { tutorsName: 'Kim' }, 
      { tutorsName: 'Austin' },
      { tutorsName: 'Eric' },
      { tutorsName: 'Substitute' }
    ],
    { individualHooks: true }
  );
};

module.exports = seedTutorsInfo;