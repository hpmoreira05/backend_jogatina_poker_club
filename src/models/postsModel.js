const { ObjectId } = require('mongodb');
const connection = require('../connection');

const createPost = async ({ description, userId, title }) => {
  const db = await connection();
  await db.collection('posts')
    .insertOne({ 
      title,
      description,
      createdAt: new Date().toLocaleString('en-US'),
      userId,
    });
  return { message: 'Post created succesfully' };
};

const getPosts = async () => {
  const db = await connection();
  const posts = await db.collection('posts').find().toArray();
  return posts;
};

const getPostsByUserId = async (_id) => {
  const db = await connection();
  const posts = await db.collection('posts').find({ userId: _id }).toArray();
  return posts;
};

const getPostById = async (id) => {
  const db = await connection();
  const editedPost = await db.collection('posts').findOne({ _id: ObjectId(id) });
  return editedPost;
};

const editPost = async ({ id, title, description }) => {
  const db = await connection();
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
  const db = await connection();
  const postDeleted = await getPostById(id);
  console.log(postDeleted);
  await db.collection('posts').deleteOne({ _id: ObjectId(id) });
  return postDeleted;
};

module.exports = { createPost, getPosts, getPostsByUserId, editPost, getPostById, deletePost };