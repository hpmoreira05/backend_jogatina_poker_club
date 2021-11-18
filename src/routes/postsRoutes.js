const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const { createPost, getPosts } = require('../controllers/postsController');

router.post('/', validateToken, createPost);
router.get('/', getPosts);

module.exports = router;