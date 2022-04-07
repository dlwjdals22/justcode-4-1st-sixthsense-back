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

module.exports = {
  createUser,
  getUserEmailByEmail,
  getUserIdbyId,
  passwordIsCorrect,
  getUserIdByEmail,
};
