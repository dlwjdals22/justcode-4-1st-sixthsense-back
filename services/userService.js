const userDao = require('../models/userDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (email, password, username, phoneNumber) => {
  // password validation
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  if (!pwValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  // duplicated email
  const userEmail = await userDao.getUserEmailByEmail(email);
  if (userEmail.length) {
    const err = new Error('EXSITING_USER');
    err.statusCode = 409;
    throw err;
  }

  // email validation
  const emailValidation = new RegExp(
    `^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}`
  );
  if (!emailValidation.test(email)) {
    const err = new Error('EMAIL_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  // userName validation
  if (!username.length || username.length > 10) {
    const err = new Error('USERNAME_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  // phonNumber validation
  const phoneNumberValidation = new RegExp(
    '^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})'
  );
  if (!phoneNumberValidation.test(phoneNumber)) {
    const err = new Error('PHONE_NUMBER_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  const encryptPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const createUser = await userDao.createUser(
    email,
    encryptPw,
    username,
    phoneNumber
  );

  return createUser;
};

const logIn = async (email, password) => {
  // 회원가입한 유저인지 아닌지 확인
  const user = await userDao.getUserEmailByEmail(email);
  if (user.length === 0) {
    const error = new Error('INVALID_USER');
    error.statusCode = 409;
    throw error;
  }

  // 비밀번호 맞는지 확인
  const loginTryUser_password = await userDao.passwordIsCorrect(email);
  const isCorrect = bcrypt.compareSync(
    password,
    loginTryUser_password[0].password
  );

  if (!isCorrect) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }
  const id = await userDao.getUserIdByEmail(email);
  const loginToken = jwt.sign(
    {
      id: id,
    },
    process.env.SECRET_KEY
  );

  return loginToken;
};

// const isLike = async (userId, dormId) => {
//   const liked = await userDao.checkExisting(userId, dormId);
//   if (liked[0]) {
//     await userDao.likeOff(userId, dormId);
//   } else {
//     await userDao.likeOn(userId, dormId);
//   }

//   return liked;
// };

// const showLike = async () => {
//   const LikeData = await userDao.getLikeTable();
//   return LikeData;
// };

module.exports = {
  signUp,
  logIn,
  //  isLike,
  //  showLike
};
