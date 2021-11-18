const db = require('../connection');

const createUser = async ({ email, password, name }) => {
  const inserted = await db.collection('users').insertOne({ name, email, password });
  return { user: { name, email, _id: inserted.insertedId } };
};

module.exports = { createUser };