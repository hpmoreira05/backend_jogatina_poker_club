const db = require('../connection');

const createPost = async ({ description, userId, title }) => {
  const createdPost = await db.collection('posts')
    .insertOne({ 
      title,
      description,
      createdAt: new Date().toLocaleString('en-US'),
      userId,
    });
  return { Post: { title, description, userId, _id: createdPost.insertedId } };
};

const getPosts = async () => {
  const posts = await db.collection('posts').find().toArray();
  return posts;
};

const getPostsByUserId = async (_id) => {
  const posts = await db.collection('posts').find({ userId: _id }).toArray();
  return posts;
};

module.exports = { createPost, getPosts, getPostsByUserId };