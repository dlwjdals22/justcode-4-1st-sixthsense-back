const dormitoryDao = require("../models/dormitoryDao");

const dormitoriesImage = async () => {
  const getDormitoriesImage = await dormitoryDao.getDormitoriesImage();
  return getDormitoriesImage;
};

const dormitories = async () => {
  return (getMiddleSlide = await dormitoryDao.getSlide());
};

const cities = async () => {
  return (getCities = await dormitoryDao.getCities());
};

const getSearchedDormitories = async (keyword, category) => {
  let isAll = false;
  if (category.length === 1 && category[0] === "") {
    isAll = true;
  }
  const temptArr = [];
  category.forEach((name) => {
    if (name === "pension") {
      temptArr.push("펜션");
    }
    if (name === "guest") {
      temptArr.push("게스트하우스");
    }
    if (name === "hotel") {
      temptArr.push("호텔");
    }
    if (name === "rental") {
      temptArr.push("렌탈 하우스");
    }
  });

  let first = temptArr[0] !== undefined ? temptArr[0] : " ";
  let second = temptArr[1] !== undefined ? temptArr[1] : " ";
  let third = temptArr[2] !== undefined ? temptArr[2] : " ";
  let fourth = temptArr[3] !== undefined ? temptArr[3] : "  ";

  const searchedDormitories = await dormitoryDao.getSearchedDormitories(
    keyword,
    isAll,
    first,
    second,
    third,
    fourth
  );

  return searchedDormitories;
};

const detail = async (para) => {
  const getDetail = await dormitoryDao.getDetail(para);
  return getDetail;
};

module.exports = {
  dormitories,
  dormitoriesImage,
  cities,
  getSearchedDormitories,
  detail,
};
