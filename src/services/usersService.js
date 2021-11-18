const Users = require('../models/usersModel');

const verifyUserInfo = async (email, password, name) => {
  const validEmail = /\S+@\S+\.\S+/;
  if (!email || !name || !password) {
    return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
  }
  if (!validEmail.test(email)) {
    return { err: { code: 400, message: { message: 'Invalid email format. Try again.' } } };
  }
};

const createUser = async ({ email, password, name }) => {
  if (await verifyUserInfo(email, password, name)) return verifyUserInfo(email, password, name);
  const registeredUser = await Users.createUser({ email, password, name });
  return registeredUser;
};

module.exports = { createUser };