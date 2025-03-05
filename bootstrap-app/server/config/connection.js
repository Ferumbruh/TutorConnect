require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    });
} else {

    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            dialect: process.env.DB_DIALECT || 'postgres',
            dialectOptions: process.env.DB_DIALECT === 'postgres' ? {} : undefined,
            logging: console.log, 
        }
    );
}

if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ force: false })
        .then(() => {
            console.log('✅ Database synced successfully.');
            console.log('📌 Registered Models:', Object.keys(sequelize.models));
        })
        .catch(err => console.error('❌ Sequelize sync error:', err));
}

module.exports = sequelize;