const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDetail = async () => {
  return await prisma.$queryRaw`
  SELECT
  ri.id,
  ri.image_url AS imageUrl
  FROM rooms r
  LEFT JOIN rooms_images ri ON r.id = ri.room_id
  WHERE ri.id < 7
  ORDER BY r.id;
  `;
};

module.exports = { getDetail };
