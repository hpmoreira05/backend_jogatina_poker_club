const Users = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const data = await Users.createUser({ email, password, name });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

module.exports = { createUser };