const dormitoryService = require("../services/dormitoryServices");

const dormitoriesImage = async (req, res, next) => {
  try {
    const getDormitoriesImage = await dormitoryService.dormitoriesImage();

    return res.status(200).json({ data: getDormitoriesImage });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const dormitories = async (req, res, next) => {
  try {
    const getDormitories = await dormitoryService.dormitories();

    return res.status(200).json({ data: getDormitories });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const cities = async (req, res, next) => {
  try {
    const getCities = await dormitoryService.cities();
    return res.status(200).json({ data: getCities });
  } catch (error) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getSearchedDormitories = async (req, res) => {
  try {
    // let keyword = req.get('keyword')
    // if(keyword==undefined){
    //     keyword=""
    // }
    let keyword = "";
    let category = req.query.category.split(",");
    const searchedDormitories = await dormitoryService.getSearchedDormitories(
      keyword,
      category
    );
    return res.status(201).json({ searchedDormitories });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const detail = async (req, res, next) => {
  try {
    const para = req.params.id;
    const getDetail = await dormitoryService.detail(para);

    return res.status(200).json({ data: getDetail });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  dormitories,
  dormitoriesImage,
  cities,
  getSearchedDormitories,
  detail,
};
