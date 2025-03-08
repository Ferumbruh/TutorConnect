const { Students, Tutors } = require('../models');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

const seedStudentsInfo = async () => {
  await Students.bulkCreate([
    { name: 'Xavaier', email: 'xavaier@example.com', password: await bcrypt.hash('school', 10), role: 'student'}
  ]);
};

const seedTutorsInfo = async () => {
  await Tutors.bulkCreate([
    { name: 'Kim', email: 'kim@example.com', password: await bcrypt.hash('school', 10), role: 'tutor'}
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