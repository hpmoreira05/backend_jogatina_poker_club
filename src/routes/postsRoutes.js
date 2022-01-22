const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const validatePostOwner = require('../middlewares/validatePostOwner');
const { 
  createUserResult, createMatch, deleteMatch, getResultsByPlayer, getMatch, getAllMatches, getAllResults, createSemester, getAllSemesters
} = require('../controllers/postsController');

router.post('/', createMatch);
router.post('/semester', createSemester);
router.get('/semester', getAllSemesters)
router.post('/results', createUserResult);
router.get('/:match', getMatch);
router.get('/created/all', getAllMatches);
router.get('/results/all/:semester', getAllResults);

router.get('/player/:name/:semester', getResultsByPlayer)
router.delete('/', deleteMatch)

module.exports = router;