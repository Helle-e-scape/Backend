const Room = require("../db/models/room");

const RoomController = {};

RoomController.create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Missing fields" });
  }
  exist = await Room.findOne({ name });

  if (exist) {
    return res.status(400).json({ message: "Room already exist" });
  }

  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    const room = new Room({ name, code });
    await room.save();
    return res.status(201).json({ message: "Room created", room });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = RoomController;
