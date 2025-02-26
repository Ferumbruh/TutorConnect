const { TutorsInfo } = require('../models');

const seedTutorsInfo = async () => {
  await TutorsInfo.bulkCreate(
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