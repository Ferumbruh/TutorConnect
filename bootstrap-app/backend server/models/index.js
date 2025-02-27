const sequelize = require('../config/connection');
const Students = require('./students');
const Tutors = require('./tutors');

const models = { Students, Tutors };

Object.values(models).forEach(model => model.init(sequelize));

sequelize.sync({ force: false })
  .then(() => console.log('✅ Database synced successfully.'))
  .catch(err => console.error('❌ Sequelize sync error:', err));

module.exports = models;