const { ObjectId } = require('mongodb');
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

const getPostById = async (id) => {
  const editedPost = await db.collection('posts').findOne({ _id: ObjectId(id) });
  return editedPost;
};

const editPost = async ({ id, title, description }) => {
  await db.collection('posts')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { 
      title,
      description,
      updatedAt: new Date().toLocaleString('en-US'),
    } });
  const editedPost = await getPostById(id);
  return editedPost;
};

const deletePost = async (id) => {
  const postDeleted = await getPostById(id);
  console.log(postDeleted);
  await db.collection('posts').deleteOne({ _id: ObjectId(id) });
  return postDeleted;
};

module.exports = { createPost, getPosts, getPostsByUserId, editPost, getPostById, deletePost };