const roomService = require("../services/roomService");

const roomsImage = async (req, res, next) => {
  try {
    const getRoomsImage = await roomService.roomsImage();

    return res.status(200).json({ data: getRoomsImage });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { roomsImage };
