require('dotenv').config();
const express = require('express');
require('./config/index');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);  // ✅ Mounts all routes

sequelize.sync().then(() => {
  console.log('Connected to database successfully.');
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
