require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');

const studentsRoutes = require('./routes/api/studentsRoutes');
const tutorsRoutes = require('./routes/api/tutorsRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);
app.use('/api/students', studentsRoutes);
app.use('/api/tutors', tutorsRoutes);


sequelize.sync({ force: false }).then(() => {
  console.log('✅ Connected to database.');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});