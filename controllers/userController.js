const userService = require('../services/userService');

const validateForm = async (req, res, next) => {
  const { email, password, username, phoneNumber } = req.body;

  if (!email || !password || !username || !phoneNumber) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }

  next();
};

const signUp = async (req, res) => {
  try {
    const { email, password, username, phoneNumber } = req.body;

    await userService.signUp(email, password, username, phoneNumber);
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { validateForm, signUp };
