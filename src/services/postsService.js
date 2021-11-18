const Posts = require('../models/postsModel');

const createPost = async ({ title, description, userId }) => {
  if (!description || !title) {
    return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
  }
  const post = await Posts.createPost({ title, description, userId });
  return post;
};

const getPosts = async (_id) => {
  const posts = await Posts.getPosts(_id);
  return posts;
};

module.exports = { createPost, getPosts };