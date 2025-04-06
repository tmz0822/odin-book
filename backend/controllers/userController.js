const User = require('../models/User');

const getCurrentUser = (req, res) => {
  try {
    // Remove sensitive data from user
    const { password, ...user } = req.user;

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ success: false, message: 'Error getting user' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error get user by id:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getCurrentUser,
  getUserById,
};
