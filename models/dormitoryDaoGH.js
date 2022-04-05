const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDormitoriesImage = async () => {
  return await prisma.$queryRaw`
  SELECT 
  di.id,
  di.image_url AS imageUrl
  FROM dormitories d 
  LEFT JOIN dormitories_images di ON d.id = di.dormitory_id
  WHERE di.id <= 10
  ORDER BY d.id;
  `;
};

const getSlide = async () => {
  return await prisma.$queryRaw`
  SELECT
    d.id AS id,
    c.name AS category,
    d.name AS name,
    d.comment AS comment,
    ci.name AS city,
    dis.name AS district,
    (SELECT 
      JSON_ARRAYAGG(y.price)
      FROM dormitories x
      LEFT JOIN rooms y ON y.dormitory_id = x.id
      WHERE x.id = d.id
      GROUP BY x.id
      ) AS price,
    (SELECT 
      JSON_ARRAYAGG(y.head_count) 
      FROM dormitories x
      LEFT JOIN rooms y ON y.dormitory_id = x.id
      WHERE x.id = d.id
      GROUP BY x.id
      ) AS headCount,
    (SELECT 
      JSON_ARRAYAGG(y.image_url)
      FROM dormitories x
      LEFT JOIN dormitories_images y ON y.dormitory_id = x.id
      WHERE x.id = d.id
      GROUP BY x.id
    ) AS imageUrl
  FROM dormitories d
  LEFT JOIN categories c ON c.id = d.category_id
  LEFT JOIN cities ci ON ci.id = d.city_id
  LEFT JOIN districts dis ON dis.id = d.district_id
  LEFT JOIN rooms r ON d.id = r.dormitory_id
  GROUP BY d.id
  `;
};

module.exports = { getSlide, getDormitoriesImage };
