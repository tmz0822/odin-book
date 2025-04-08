const { Router } = require('express');
const router = Router();

const followController = require('../controllers/followController');
const { isAuthenticated } = require('../middlewares/auth');

router.use(isAuthenticated);

// /users

router.get('/:userId/following', followController.getUserFollowings);
router.get('/:userId/followers', followController.getUserFollowers);

router.post('/:userId/following', followController.sendFollowRequest); // send follow request
router.delete('/:userId/following', followController.unFollow); // unfollow user

// router.get('/:userId/follow-requests');
router.put(
  '/:userId/follow-requests/:requestId',
  followController.updateFollowRequest
);

module.exports = router;
