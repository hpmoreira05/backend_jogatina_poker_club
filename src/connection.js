// const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose default connection is open');
});

db.on('error', (err) => {
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log(
      'Mongoose default connection is disconnected due to application termination',
    );
    process.exit(0);
  });
});

module.exports = db;