const dormitoryService = require("../services/dormitoryServicesGH");

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

module.exports = { dormitories, dormitoriesImage, cities };
