const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const { createPost } = require('../controllers/postsController');

router.post('/', validateToken, createPost);

module.exports = router;