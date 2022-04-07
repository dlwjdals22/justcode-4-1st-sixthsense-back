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

const getSearchedDormitories = async (keyword,category) => {
  let isAll = false;
  if(category.length===1 && category[0]===''){
     isAll = true; 
  }

  let first = category[0]!==undefined? category[0] : ' ';
  let second = category[1]!==undefined? category[1] : ' ';
  let third = category[2]!==undefined? category[2] : ' ';
  let fourth = category[3]!==undefined? category[3] : '  ';

  
  
  const searchedDormitories = await dormListDao.getSearchedDormitories(keyword, isAll, first, second, third, fourth)

  return searchedDormitories
};

module.exports = { dormitories, dormitoriesImage, cities, getSearchedDormitories };
