const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (email, encryptPw, userName, phoneNumber) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password, username, phone_number) VALUES (${email}, ${encryptPw}, ${userName}, ${phoneNumber})`;
};

const loginUser = async (email) => {
  const user = await prisma.$queryRaw`SELECT * FROM users WHERE email=${email}`;
  if (user.length === 0) {
    const error = new Error("INVALID_USER");
    error.statusCode = 409;
    throw error;
  }
};

module.exports = { createUser, loginUser };
