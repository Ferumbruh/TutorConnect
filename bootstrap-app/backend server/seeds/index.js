const seedStudentsInfo = require('./students-seeds');
const seedTutorsInfo = require('./tutors-seeds');
const sequelize = require('../config/connection.js');

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