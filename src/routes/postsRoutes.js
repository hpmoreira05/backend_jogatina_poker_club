const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const { 
  createPost,
  getPosts,
  getPostsByUserId,
  editPost,
} = require('../controllers/postsController');

router.post('/', validateToken, createPost);
router.get('/', getPosts);
router.get('/myposts', validateToken, getPostsByUserId);
router.put('/:id', editPost);

module.exports = router;