const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

const secret = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.getUserByEmail(decoded.data.email);
    if (!user) {
      return res.status(401).json({ message: 'JWT malformed' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'JWT malformed' });
  }
};