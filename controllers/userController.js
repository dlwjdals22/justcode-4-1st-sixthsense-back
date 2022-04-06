const userService = require('../services/userService');

const validateForm = async (req, res, next) => {
  const { email, password, userName, phoneNumber } = req.body;

  if (!email || !password || !userName || !phoneNumber) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }

  next();
};

const signUp = async (req, res) => {
  try {
    const { email, password, userName, phoneNumber } = req.body;

    await userService.signUp(email, password, userName, phoneNumber);
    console.log(2);
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    await userService.logIn(email, password);
    return res.status(201).json({
      message: 'LOGIN_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = { validateForm, signUp, logIn };
