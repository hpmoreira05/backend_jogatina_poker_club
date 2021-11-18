const Login = require('../services/loginService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Login.login({ email, password });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

module.exports = { login };