const seedStudentsInfo = require('./students-seeds');
const seedTutorsInfo = require('./tutors-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedStudentsInfo();
    console.log('\n----- STUDENTS SEEDED -----\n');

    await seedTutorsInfo();
    console.log('\n----- TUTORS SEEDED -----\n');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();