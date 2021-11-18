const { ObjectId } = require('mongodb');
const Posts = require('../models/postsModel');

const createPost = async ({ title, description, userId }) => {
  if (!description || !title) {
    return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
  }
  const post = await Posts.createPost({ title, description, userId });
  return post;
};

const getPosts = async () => {
  const posts = await Posts.getPosts();
  return posts;
};

const getPostsByUserId = async (_id) => {
  if (!ObjectId.isValid(_id)) {
    return { err: { code: 404, message: { message: 'Posts by user not found' } } };
  }
  const posts = await Posts.getPostsByUserId(_id);
  return posts;
};

module.exports = { createPost, getPosts, getPostsByUserId };