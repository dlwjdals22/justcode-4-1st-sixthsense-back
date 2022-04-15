const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, encryptPw, username, phoneNumber) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password, username, phone_number) VALUES (${email}, ${encryptPw}, ${username}, ${phoneNumber})`;
};

const getUserEmailByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT email FROM users WHERE email=${email}`;
};

const getUserIdByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT id FROM users WHERE email=${email}`;
};

const getUserIdbyId = async (user_id) => {
  return await prisma.$queryRaw`
    SELECT id FROM users WHERE id=${user_id}`;
};

const passwordIsCorrect = async (email) => {
  return await prisma.$queryRaw`SELECT password FROM users WHERE email=${email};`;
};

const checkExisting = async (userId, dormId) => {
  return await prisma.$queryRaw`
    SELECT user_id FROM users_dormitories_like WHERE user_id=${userId} AND dormitory_id=${dormId}`;
};

// const likeOn = async (userId, dormId) => {
//   return await prisma.$queryRaw`
//     INSERT INTO users_dormitories_like(user_id, dormitory_id) VALUES (${userId}, ${dormId})`;
// };

// const likeOff = async (userId, dormId) => {
//   return await prisma.$queryRaw`
//     DELETE FROM users_dormitories_like WHERE user_id=${userId} AND dormitory_id=${dormId}`;
// };

// const getLikeTable = async () => {
//   return await prisma.$queryRaw`
//     SELECT * FROM users_dormitories_like`;
// };

module.exports = {
  createUser,
  getUserEmailByEmail,
  getUserIdbyId,
  passwordIsCorrect,
  getUserIdByEmail,
  checkExisting,
  // likeOn,
  // likeOff,
  // getLikeTable,
};
