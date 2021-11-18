const Posts = require('../services/postsService');

const createPost = async (req, res) => {
  try {
    const { description, title } = req.body;
    const { _id } = req.user;
    const data = await Posts.createPost({ title, description, userId: _id });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

module.exports = { createPost };