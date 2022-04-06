const dormitoryDao = require("../models/dormitoryDaoGH");

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

module.exports = { dormitories, dormitoriesImage, cities };
