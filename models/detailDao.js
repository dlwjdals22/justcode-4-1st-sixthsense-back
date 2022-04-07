const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDetail = async () => {
  return await prisma.$queryRaw`
    SELECT
    
    `;
};

module.exports = { getDetail };
