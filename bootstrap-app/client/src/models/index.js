const sequelize = require('../config/connection');
const StudentsInfo = require('./students')(sequelize);
const TutorsInfo = require('./tutors')(sequelize);

sequelize.sync({ force: false })
  .then(() => console.log('Database synced successfully.'))
  .catch(err => console.error('Sequelize sync error:', err));

module.exports = { StudentsInfo, TutorsInfo };