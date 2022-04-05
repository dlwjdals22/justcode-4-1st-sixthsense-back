const userDao = require('../models/userDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (email, password, userName, phoneNumber) => {
  // password validation
  // email validation
  // userName validation
  // phonNumber validation

  const encryptPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const createUser = await userDao.createUser(
    email,
    encryptPw,
    userName,
    phoneNumber
  );

  return createUser;
};

module.exports = { signUp };
