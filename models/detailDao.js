const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDetail = async () => {
  return await prisma.$queryRaw`
  SELECT
  d.name AS dormitories_name,
  d.comment, 
  d.main_description, 
  d.sub_description,

  (SELECT
    JSON_ARRAYAGG(y.image_url)
    FROM dormitories x
    LEFT JOIN dormitories_images y ON y.dormitory_id = x.id
    WHERE x.id = d.id
    GROUP BY x.id
    ) AS main_img_url,

  (SELECT
    JSON_ARRAYAGG(y.name)
    FROM dormitories x
    LEFT JOIN recommend_places y ON y.dormitory_id = x.id
    WHERE x.id = d.id
    GROUP BY x.id
    ) AS name,

  (SELECT
    JSON_ARRAYAGG(y.type)
    FROM dormitories x
    LEFT JOIN recommend_places y ON y.dormitory_id = x.id
    WHERE x.id = d.id
    GROUP BY x.id
    ) AS type,

  (SELECT
    JSON_ARRAYAGG(y.description)
    FROM dormitories x
    LEFT JOIN recommend_places y ON y.dormitory_id = x.id
    WHERE x.id = d.id
    GROUP BY x.id
    ) AS description,

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
  ) AS imageUrl,

  (SELECT 
    JSON_ARRAYAGG(y. title)
    FROM dormitories x
    LEFT JOIN rooms_specials y ON y.dormitory_id = x.id
    WHERE x.id = d.id
    GROUP BY x.id
  ) AS title,

  (SELECT 
    JSON_ARRAYAGG(y. description)
    FROM dormitories x
    LEFT JOIN rooms_specials y ON y.dormitory_id = x.id
    WHERE x.id = d.id
    GROUP BY x.id
  ) AS sub_description
  

  FROM dormitories d



  `;
};

module.exports = { getDetail };
