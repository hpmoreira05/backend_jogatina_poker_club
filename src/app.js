require('dotenv/config');
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello!');
});

module.exports = app;