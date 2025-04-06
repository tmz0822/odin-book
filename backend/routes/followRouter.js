const { Router } = require('express');
const router = Router();

const followController = require('../controllers/followController');
const { isAuthenticated } = require('../middlewares/auth');

router.use(isAuthenticated);

router.get('/me/followings', followController.getUserFollowings);
router.get('/:userId/followings', followController.getUserFollowings);

router.get('/me/followers', followController.getUserFollowers);
router.get('/:userId/followers', followController.getUserFollowers);

router.post('/:userId/request', followController.sendFollowRequest); // send follow request
router.put('/:followRequestId/accept', followController.acceptFollowRequest);

module.exports = router;
