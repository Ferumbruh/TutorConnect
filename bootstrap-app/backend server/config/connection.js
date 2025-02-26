const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');

let sequelize;

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
            logging: console.log, // Optional: remove if not needed
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