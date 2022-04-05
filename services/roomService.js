const roomDao = require("../models/roomDao");

const roomsImage = async () => {
  const random6 = [];

  for (let i = 0; i < 6; i++) {
    random6.push(Math.floor(Math.random() * (30 - 1)) + 1);
  }

  const getRoomsImage = await roomDao.getRoomsImage(
    random6[0],
    random6[1],
    random6[2],
    random6[3],
    random6[4],
    random6[5]
  );
  return getRoomsImage;
};

module.exports = { roomsImage };
