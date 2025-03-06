const { Students } = require('../models');

const seedStudentsInfo = async () => {
  await Students.bulkCreate(
    [
      { studentsName: 'Xavaier' },
      { studentsName: 'Zachary' },
      { studentsName: 'James' },
      { studentsName: 'Guy' }
    ],
    { individualHooks: true }
  );
};

module.exports = seedStudentsInfo;