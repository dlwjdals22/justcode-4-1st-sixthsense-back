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

const getLikeByEmailDorm = async () => {
  // user_id , dromitory_id 인자로 받아와서 조건에 추가해야함
  return await prisma.$queryRaw`
    SELECT user_id FROM users_dormitories_like WHERE user_id= AND dormitory_id= `;
};

const likeOn = async () => {
  // email이랑 도미토리 id 받아옴.
  return await prisma.$queryRaw`
    INSERT INTO users_dormitories_like(user_id, dormitory_id) VALUES ()`;
};

const likeOff = async () => {
  // email이랑 도미토리 id 받아옴.
  return await prisma.$queryRaw`
    DELETE FROM users_dormitories_like WHERE user_id= AND dormitory_id= `;
};

module.exports = {
  createUser,
  getUserEmailByEmail,
  getLikeByEmailDorm,
  likeOn,
  likeOff,
};
