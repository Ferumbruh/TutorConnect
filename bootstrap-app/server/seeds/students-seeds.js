const { Students } = require('../models/index');

const seedStudentsInfo = async () => {
  try {
    await Students.bulkCreate([
      {

        name: 'Xavaier',
        email: 'xavaier@example.com',
        password: await bcrypt.hash('school', 10), 
        role: 'student',
      },
    ]);
    console.log('✅ Students data seeded');
  } catch (err) {
    console.error('❌ Error seeding students data:', err);
  }
};

seedStudentsInfo();