const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (email, encryptPw, userName, phoneNumber) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password, username, phone_number) VALUES (${email}, ${encryptPw}, ${userName}, ${phoneNumber})`;
};

const getUserEmailByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT email FROM users WHERE email=${email}`;
};

module.exports = { createUser, getUserEmailByEmail };
