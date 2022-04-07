//숙소 및 여행지 검색 (전체 list 출력)
const {PrismaClient, Prisma} = require('@prisma/client')
const prisma = new PrismaClient()

// 숙소 전체 리스트 읽어오기
const getDormitories = async () => {
    return await prisma.$queryRaw`
    SELECT 
        d.id id,
        c.name category, 
        d.name dormitory, 
        city.name city, 
        dis.name district, 
    (SELECT 
        JSON_ARRAYAGG(r.price)
        FROM dormitories d 
        JOIN rooms r ON r.dormitory_id = d.id
        WHERE d.id = r.id
        GROUP BY d.id) AS price,
    (SELECT
        JSON_ARRAYAGG(r.head_count)
        FROM dormitories d
        JOIN rooms r ON r.dormitory_id = d.id
        WHERE d.id = r.id
        GROUP BY d.id) AS headCount,
    (SELECT 
        JSON_ARRAYAGG(di.image_url)
        FROM dormitories x
        JOIN dormitories_images di ON di.dormitory_id = d.id
        WHERE d.id = x.id
        GROUP BY x.id) AS imageUrl
    FROM dormitories d
    JOIN categories c ON d.category_id = c.id
    JOIN rooms r ON d.id = r.dormitory_id
    JOIN cities city ON d.city_id = city.id
    JOIN districts dis ON d.district_id = dis.id
    GROUP BY d.id
    ORDER BY id;
    `
}

const getSearchedDormitories = async (keyword, isAll, first, second, third, fourth) => {
    keyword = '%'+keyword+'%'
    return await prisma.$queryRaw`
    SELECT * FROM
    (SELECT 
    d.id id,
    c.name category, 
    d.name dormitory, 
    city.name city, 
    dis.name district, 
(SELECT 
    JSON_ARRAYAGG(r.price)
    FROM dormitories d 
    JOIN rooms r ON r.dormitory_id = d.id
    WHERE d.id = r.id
    GROUP BY d.id) AS price,
(SELECT
    JSON_ARRAYAGG(r.head_count)
    FROM dormitories d
    JOIN rooms r ON r.dormitory_id = d.id
    WHERE d.id = r.id
    GROUP BY d.id) AS headCount,
(SELECT 
    JSON_ARRAYAGG(di.image_url)
    FROM dormitories x
    JOIN dormitories_images di ON di.dormitory_id = d.id
    WHERE d.id = x.id
    GROUP BY x.id) AS imageUrl
FROM dormitories d
JOIN categories c ON d.category_id = c.id
JOIN rooms r ON d.id = r.dormitory_id
JOIN cities city ON d.city_id = city.id
JOIN districts dis ON d.district_id = dis.id
WHERE d.name LIKE ${keyword} OR city.name LIKE ${keyword} OR dis.name LIKE ${keyword}
GROUP BY d.id
ORDER BY d.id) AS myTable
${!isAll ?
    Prisma.sql`
    WHERE category in (${first}, ${second}, ${third}, ${fourth})`
    :
    Prisma.empty
}
;`
}



module.exports = {getDormitories, getSearchedDormitories}