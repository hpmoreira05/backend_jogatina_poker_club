const Posts = require('../models/postsModel');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;
    const post = await Posts.getPostById(id);
    const authorized = post.userId.toString() === _id.toString();
    if (!authorized) return res.status(401).json({ message: 'Unalthorized' });
    next();
};