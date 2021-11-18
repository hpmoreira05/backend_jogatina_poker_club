const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const validatePostOwner = require('../middlewares/validatePostOwner');
const { 
  createPost,
  getPosts,
  getPostsByUserId,
  editPost,
  deletePost,
} = require('../controllers/postsController');

router.post('/', validateToken, createPost);
router.get('/', getPosts);
router.get('/myposts', validateToken, getPostsByUserId);
router.put('/:id', validateToken, validatePostOwner, editPost);
router.delete('/:id', validateToken, validatePostOwner, deletePost);

module.exports = router;