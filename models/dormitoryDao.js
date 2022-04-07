const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getDetail = async (para) => {
  return await prisma.$queryRaw`
  SELECT
    d.id AS id,
    d.name AS dormitoryName,
    d.comment,
    d.main_description,
    d.sub_description,
    ci.name AS city,
    dis.name AS district,
    (SELECT 
      JSON_ARRAYAGG(y.image_url)
      FROM dormitories x
      JOIN dormitories_images y ON y.dormitory_id = x.id
      WHERE d.id = x.id
      GROUP BY x.id) AS dormitoryImageUrl,
    (SELECT
      JSON_ARRAYAGG(y.title)
      FROM dormitories x
      JOIN rooms_specials y ON y.dormitory_id = x.id
      WHERE d.id = x.id
      GROUP BY x.id) AS roomSpecialTitle,
    (SELECT
      JSON_ARRAYAGG(y.description)
      FROM dormitories x
      JOIN rooms_specials y ON y.dormitory_id = x.id
      WHERE d.id = x.id
      GROUP BY x.id) AS roomSpecialDes,
      (SELECT
        JSON_ARRAYAGG(y.name)
        FROM dormitories x
        JOIN recommend_places y ON y.dormitory_id = x.id
        WHERE d.id = x.id
        GROUP BY x.id) AS recommendPlacesName,
        (SELECT
          JSON_ARRAYAGG(y.type)
          FROM dormitories x
          JOIN recommend_places y ON y.dormitory_id = x.id
          WHERE d.id = x.id
          GROUP BY x.id) AS recommendPlacesType,
      (SELECT
        JSON_ARRAYAGG(y.description)
        FROM dormitories x
        JOIN recommend_places y ON y.dormitory_id = x.id
        WHERE d.id = x.id
        GROUP BY x.id) AS recommendPlacesDes
  FROM dormitories d
  LEFT JOIN cities ci ON ci.id =  d.city_id
  LEFT JOIN districts dis ON dis.id = d.city_id
  WHERE d.id = ${para}
  `;
};

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

const getCities = async () => {
  return prisma.$queryRaw`
  SELECT id, name FROM cities
  `;
};

const getSearchedDormitories = async (
  keyword,
  isAll,
  first,
  second,
  third,
  fourth
) => {
  keyword = "%" + keyword + "%";
  return await prisma.$queryRaw`
  SELECT * FROM
  (SELECT 
  d.id AS id,
  c.name AS category, 
  d.name AS name, 
  ci.name AS city, 
  dis.name district, 
(SELECT 
  JSON_ARRAYAGG(y.price)
  FROM dormitories x 
  JOIN rooms y ON y.dormitory_id = x.id
  WHERE x.id = d.id
  GROUP BY x.id) AS price,
(SELECT
  JSON_ARRAYAGG(y.head_count)
  FROM dormitories x
  JOIN rooms y ON y.dormitory_id = x.id
  WHERE x.id = d.id
  GROUP BY x.id) AS headCount,
(SELECT 
  JSON_ARRAYAGG(y.image_url)
  FROM dormitories x
  JOIN dormitories_images y ON y.dormitory_id = x.id
  WHERE d.id = x.id
  GROUP BY x.id) AS imageUrl
FROM dormitories d
JOIN categories c ON d.category_id = c.id
JOIN rooms r ON d.id = r.dormitory_id
JOIN cities ci ON d.city_id = ci.id
JOIN districts dis ON d.district_id = dis.id
WHERE d.name LIKE ${keyword} OR ci.name LIKE ${keyword} OR dis.name LIKE ${keyword}
GROUP BY d.id
ORDER BY d.id) AS myTable
${
  !isAll
    ? Prisma.sql`WHERE category in (${first}, ${second}, ${third}, ${fourth})`
    : Prisma.empty
};`;
};

module.exports = {
  getSlide,
  getDormitoriesImage,
  getCities,
  getSearchedDormitories,
  getDetail,
};
