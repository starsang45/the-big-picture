// server/authController.cjs

const authController = {
  register: (req, res) => {
    res.status(201).json({ message: 'Mock register successful' });
  },
  login: (req, res) => {
    // Simulate login by saving a mock user ID in session
    req.session.userId = 'mock-user-id';
    res.status(200).json({ message: 'Mock login successful' });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Mock logout successful' });
  },
};

module.exports = authController;
