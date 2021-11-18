const Users = require('../models/usersModel');

const createUser = async ({ email, password, name }) => {
  const registeredUser = await Users.createUser({ email, password, name });
  return registeredUser;
};

module.exports = { createUser };