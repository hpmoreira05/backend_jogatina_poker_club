const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const Users = require('../models/usersModel');
const { sendEmail } = require('./sendEmailService');

const generateToken = (user, email) => {
  const secret = process.env.SECRET_KEY;
  const jwtConfig = {
    expiresIn: '8h',
    algorithm: 'HS256',
  };
  const { _id } = user;
  const userId = ObjectId(_id).toString();
  const userInfoToken = { userId, email };
  const token = jwt.sign({ data: userInfoToken }, secret, jwtConfig);
  return { token };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    return { err: { code: 401, message: { message: 'All fields must be filled' } } };
  }
  const user = await Users.getUserByEmail(email);
  if (!user || user.password !== password) {
    return { err: { code: 401, message: { message: 'Incorrect username or password' } } };
  }
  const token = generateToken(user, email);
  return token;
};

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

module.exports = { createUser, login };