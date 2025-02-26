
const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // For Render-hosted PostgreSQL
      },
    },
  });

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: console.log,
        }
    );
}

sequelize.sync({ force: false })
    .then(() => {
        console.log('✅ Database synced successfully.');
        console.log('📌 Registered Models:', Object.keys(sequelize.models));
    })
    .catch(err => console.error('❌ Sequelize sync error:', err));

module.exports = sequelize;