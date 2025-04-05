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

module.exports = {
  getCurrentUser,
};
