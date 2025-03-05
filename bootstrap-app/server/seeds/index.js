const { Students, Tutors } = require('../models');
const sequelize = require('../config/connection');

const seedStudentsInfo = async () => {
  await Students.bulkCreate([
    { name: 'Xavaier', studentsEmail: 'xavaier@example.com' },
    { name: 'Zachary', studentsEmail: 'zachary@example.com' },
  ]);
};

const seedTutorsInfo = async () => {
  await Tutors.bulkCreate([
    { tutorsName: 'Kim', tutorsEmail: 'kim@example.com', tutorsPassword: '123', tutorsRole: 'tutor'}
  ]);
};

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ DATABASE SYNCED');

    await seedStudentsInfo();
    console.log('✅ STUDENTS SEEDED');

    await seedTutorsInfo();
    console.log('✅ TUTORS SEEDED');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();