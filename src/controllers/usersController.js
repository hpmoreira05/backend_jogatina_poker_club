const Users = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await Users.createUser({ name });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

const getUser = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await Users.getUser({ name });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await Users.getUsers();
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

module.exports = { createUser, getUser, getUsers };