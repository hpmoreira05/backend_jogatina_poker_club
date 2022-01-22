const router = require('express').Router();
const { createUser, getUser, getUsers } = require('../controllers/usersController');

router.post('/', createUser);
router.get('/', getUser);
router.get('/all', getUsers)

module.exports = router;