const dormitoryDao = require("../models/dormitoryDaoGH");

const dormitoriesImage = async () => {
  const getDormitoriesImage = await dormitoryDao.getDormitoriesImage();
  return getDormitoriesImage;
};

const slide = async () => {
  return (getMiddleSlide = await dormitoryDao.getSlide());
};

module.exports = { slide, dormitoriesImage };
