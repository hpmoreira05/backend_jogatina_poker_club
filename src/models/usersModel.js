const connection = require('../connection');

const createUser = async ({ name }) => {
  const db = await connection();
  await db.collection('users').insertOne({ name });
  return { message: 'User successfully registered' };
};

const getUserByName = async (name) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ name });
  return user;
};

const getUsers = async () => {
  const db = await connection();
  const users = await db.collection('users').find().toArray();
  return users;
};

module.exports = { createUser, getUserByName, getUsers };