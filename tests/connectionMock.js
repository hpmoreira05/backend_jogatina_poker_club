// const { MongoClient } = require('mongodb');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
};

// const dbMock = async () => mongoose.connect(await DBServer.getUri(), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const dbMock = mongoose.connection;

// module.exports = dbMock;

module.exports = { getConnection };
