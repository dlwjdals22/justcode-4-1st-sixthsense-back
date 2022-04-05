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

const slide = async (req, res, next) => {
  try {
    const getSlide = await dormitoryService.slide();

    return res.status(200).json({ data: getSlide });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { slide, dormitoriesImage };
