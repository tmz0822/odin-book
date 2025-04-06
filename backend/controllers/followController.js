const Follow = require('../models/Follow');

const sendFollowRequest = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.userId;

  try {
    const followRequest = await Follow.addFollowRequest(senderId, receiverId);

    res.json({
      success: true,
      followRequest,
      message: 'Sent follow request successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptFollowRequest = async (req, res) => {
  const userId = req.user.id; // The one accepts the request is the current logged in user.
  const followRequestId = req.params.followRequestId;

  try {
    const followRequest = await Follow.acceptFollowRequest(
      userId,
      followRequestId
    );

    if (!followRequest) {
      console.error('Invalid follow request');
      throw new Error('Invalid follow request');
    }

    const follow = await Follow.addFollow(
      followRequest.senderId,
      followRequest.receiverId
    );

    res.json({ success: true, follow });
  } catch (error) {
    console.error('Failed to accept follow request');
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserFollowings = async (req, res) => {
  const userId = req.params.userId || req.user.id;

  try {
    const followings = await Follow.findUserFollowings(userId);

    res.json({ success: true, followings });
  } catch (error) {
    console.error('Failed to get user followings');
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserFollowers = async (req, res) => {
  const userId = req.params.userId || req.user.id;

  try {
    const followers = await Follow.findUserFollowers(userId);

    res.json({ success: true, followers });
  } catch (error) {
    console.error('Failed to get user followers');
    res.status(500).json({ success: false, message: error.message });
  }
};

const unFollow = async (req, res) => {
  const userId = req.user.id;
  const followingId = req.params.followingId;

  try {
    const deletedFollow = await Follow.deleteFollow(userId, followingId);

    res.json({ success: true, deletedFollow });
  } catch (error) {
    console.error('Failed to unfollow');
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendFollowRequest,
  acceptFollowRequest,
  getUserFollowings,
  getUserFollowers,
  unFollow,
};
