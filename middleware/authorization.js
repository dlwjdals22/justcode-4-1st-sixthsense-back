const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const validateToken = async (req, res, next) => {
  const token =
    req.headers.authorization || jwt.sign({}, process.env.SECRET_KEY);

  const user = jwt.verify(token, process.env.SECRET_KEY);

  const checkUser = await userDao.getUserIdbyId(user.id[0].id);

  if (!checkUser[0]) {
    res.status(404).json({ message: 'USER_NOT_FOUND' });
    return;
  }

  req.userId = user.id[0].id;

  next();
};

module.exports = { validateToken };
