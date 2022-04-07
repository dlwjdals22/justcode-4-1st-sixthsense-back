const detailDao = require("../models/detailDao");

const detail = async () => {
  const getDetail = await detailDao.getDetail();
  return getDetail;
};

module.exports = { detail };
