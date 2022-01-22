require('dotenv/config');
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/matches', postsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to The Wall App API!');
});

module.exports = app;