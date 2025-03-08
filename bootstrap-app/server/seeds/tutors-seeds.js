const { Tutors } = require('../models');
const bcrypt = require('bcryptjs');

const seedTutorsInfo = async () => {
  try {
    await Tutors.bulkCreate(
      [
        {
          name: 'Kim', 
          email: 'kim@example.com',
          password: await bcrypt.hash('school', 10), 
          role: 'tutor'
        }
      ],
      { individualHooks: true }
    );
    console.log('✅ Tutors data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding tutors data:', error);
  }
};

module.exports = seedTutorsInfo;