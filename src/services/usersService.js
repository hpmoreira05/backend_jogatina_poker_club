const Users = require('../models/usersModel');
const { sendEmail } = require('./sendEmailService');

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
  const emailExists = await Users.getUserByEmail(email);
  if (emailExists) return { err: { code: 409, message: { message: 'Email already registered' } } };
  const emailSent = await sendEmail(email, name);
  if (!emailSent) {
    return { err: { code: 500, message: { message: 'Something went wrong. Try again later' } } };
  }
  const registeredUser = await Users.createUser({ email, password, name });
  return registeredUser;
};

module.exports = { createUser };