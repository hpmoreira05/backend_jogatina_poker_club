const router = require('express').Router();
const { createUser, login, validation } = require('../controllers/usersController');
const validateToken = require('../middlewares/validateToken');

router.post('/', createUser);
router.post('/login', login);
router.post('/validation', validateToken, validation);

module.exports = router;