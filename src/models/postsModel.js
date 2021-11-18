const db = require('../connection');

const createPost = async ({ description, userId, title }) => {
  const createdPost = await db.collection('posts')
    .insertOne({ 
      title,
      description,
      createdAt: new Date().toLocaleString('pt-br'),
      userId,
    });
  return { Post: { title, description, userId, _id: createdPost.insertedId } };
};

module.exports = { createPost };