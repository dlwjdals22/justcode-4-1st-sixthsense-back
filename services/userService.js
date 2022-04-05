const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (email, password) => {
  try {
    if (!email || !password) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw arr;
    }
  } catch (err) {
    console(err);
    next(err);
  }
};

module.exports = { signUp, login };
