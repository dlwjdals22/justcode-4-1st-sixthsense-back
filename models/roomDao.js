const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRoomsImage = async (n1, n2, n3, n4, n5, n6) => {
  return await prisma.$queryRaw`
    SELECT
    ri.id,
    ri.image_url AS imageUrl
    FROM rooms r
    LEFT JOIN rooms_images ri ON r.id = ri.room_id
    WHERE ri.id = ${n1} or ri.id = ${n2} or ri.id = ${n3} or ri.id = ${n4} or ri.id = ${n5} or ri.id = ${n6}
    ORDER BY r.id;
    `;
};

module.exports = { getRoomsImage };
