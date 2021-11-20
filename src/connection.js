// const mongoose = require('mongoose');

// require('dotenv').config();

// mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('connected', () => {
//   console.log('Mongoose default connection is open');
// });

// db.on('error', (err) => {
//   console.log(`Mongoose default connection has occured \n${err}`);
// });

// db.on('disconnected', () => {
//   console.log('Mongoose default connection is disconnected');
// });

// process.on('SIGINT', () => {
//   db.close(() => {
//     console.log(
//       'Mongoose default connection is disconnected due to application termination',
//     );
//     process.exit(0);
//   });
// });

// module.exports = db;

const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.DATABASE_CONNECTION_STRING;
const DB_NAME = 'myFirstDatabase';

let db = null;

const connection = () => 
     (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
    }));

module.exports = connection;