const { Students, Tutors } = require('../models');
const sequelize = require('../config/connection');

const seedStudentsInfo = async () => {
  await Students.bulkCreate([
    { name: 'Xavaier', email: 'xavaier@example.com', password: 'long', studentsRole: 'student'}
  ]);
};

const seedTutorsInfo = async () => {
  await Tutors.bulkCreate([
    { name: 'Kim', email: 'kim@example.com', password: 'school', tutorsRole: 'tutor'}
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