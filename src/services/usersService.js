const Users = require('../models/usersModel');

const createUser = async ({ name }) => {
  const nameExists = await Users.getUserByName(name);
  if (nameExists) return { err: { code: 409, message: { message: 'Name already exists' } } };
  const registeredUser = await Users.createUser({ name });
  return registeredUser;
};

const getUser = async ({ name }) => {
  const nameExists = await Users.getUserByName(name);
  if (!nameExists) return { err: { code: 409, message: { message: 'No user found' } } };
  return nameExists;
};

const getUsers = async () => {
  const users = await Users.getUsers();
  return users;
};

module.exports = { createUser, getUser, getUsers };