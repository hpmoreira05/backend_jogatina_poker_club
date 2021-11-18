const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const User = require('../models/usersModel');

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
  const user = await User.getUserByEmail(email);
  if (!user || user.password !== password) {
    return { err: { code: 401, message: { message: 'Incorrect username or password' } } };
  }
  const token = generateToken(user, email);
  return token;
};

module.exports = { login };