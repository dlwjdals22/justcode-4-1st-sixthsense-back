const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { email, password, username, phoneNumber } = req.body;

    if (!email || !password || !username || !phoneNumber) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp(email, password, username, phoneNumber);
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

    if (!email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const token = await userService.logIn(email, password);

    return res.status(201).json({
      message: 'LOGIN_SUCCESS',
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const test = async (req, res) => {
  try {
    const userId = req.userId;
    const dormId = req.body.dormitory;

    return res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// const isLike = async (req, res) => {
//   try {
//     const userId = req.userId;
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

module.exports = { signUp, logIn, test };
