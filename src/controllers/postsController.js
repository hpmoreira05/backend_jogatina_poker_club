const Posts = require('../services/postsService');

const errorMessage = 'Something went wrong. Try again later';

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
    res.status(500).json({ message: errorMessage });
  }
};

const getPosts = async (req, res) => {
  try {
    const data = await Posts.getPosts();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const getPostsByUserId = async (req, res) => {
  try {
    const { _id } = req.user;
    const data = await Posts.getPostsByUserId(_id);
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const data = await Posts.editPost({ id, title, description });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Posts.deletePost(id);
    if (data && data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

module.exports = { createPost, getPosts, getPostsByUserId, editPost, deletePost };