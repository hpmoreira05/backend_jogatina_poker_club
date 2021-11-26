const router = require('express').Router();
const { createUser, login } = require('../controllers/usersController');

router.post('/', createUser);
router.post('/login', login);

module.exports = router;