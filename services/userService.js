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

const isLike = () => {
  const decoded = jwt.decode(token);
  // 디코디드 한 토큰에서 email 추출

  // user id, dormitory id 전달하기
  const isLike = await userDao.getLikeByEmailDorm();

  if (isLike.length) {
    // isLike 존재하면 좋아요 off => data delete
    await userDao.likeOff();
  } else {
    // isLike 존재하지 않으면 좋아요 on => data insert
    await userDao.likeOn();
  }
  return;
};

module.exports = { signUp, isLike };
