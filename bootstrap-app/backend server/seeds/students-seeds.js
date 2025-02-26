const { StudentsInfo } = require('../models');

const seedStudentsInfo = async () => {
  await StudentsInfo.bulkCreate(
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