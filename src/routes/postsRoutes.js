const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const { createPost, getPosts, getPostsByUserId } = require('../controllers/postsController');

router.post('/', validateToken, createPost);
router.get('/', getPosts);
router.get('/myposts', validateToken, getPostsByUserId);

module.exports = router;