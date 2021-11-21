const { ObjectId } = require('mongodb');
const Posts = require('../models/postsModel');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;
    if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'Post not found' });
    const post = await Posts.getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const authorized = post.userId.toString() === _id.toString();
    if (!authorized) return res.status(401).json({ message: 'Unalthorized' });
    next();
};