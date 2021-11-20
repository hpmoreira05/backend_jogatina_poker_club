const connection = require('../connection');

const createUser = async ({ email, password, name }) => {
  const db = await connection();
  await db.collection('users').insertOne({ name, email, password });
  return { message: 'Successfully registered user' };
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = { createUser, getUserByEmail };