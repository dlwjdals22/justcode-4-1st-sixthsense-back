const detailService = require("../services/detailService");

const detail = async (req, res, next) => {
  try {
    const getDetail = await detailService.detail();

    return res.status(200).json({ data: getDetail });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { detail };
