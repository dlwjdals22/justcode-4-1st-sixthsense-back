const roomDao = require("../models/roomDao");

const roomsImage = async () => {
  const getRoomsImage = await roomDao.getRoomsImage();
  return getRoomsImage;
};

module.exports = { roomsImage };
