const Room = require("../db/models/room");
const User = require("../db/models/user");
const { sendMessage } = require("../websocket");

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

RoomController.userJoin = async (req, res) => {
  const { _id, roomCode } = req.body;

  if (!_id && roomCode) {
    return res.status(400).json({ message: "Missing fields" });
  }

  existUser = await User.findById({ _id });
  existRoom = await Room.findOne({ code: roomCode });

  if (!existRoom) {
    return res.status(400).json({ message: "Room not exist" });
  }

  if (!existUser) {
    return res.status(400).json({ message: "User not exist" });
  }

  try {
    await User.updateOne({ _id }, { roomId: existRoom._id });
    sendMessage({ type: "join_room", user: existUser, room: existRoom });
    return res
      .status(201)
      .json({ message: existUser.pseudo + " join the room " + existRoom.name });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = RoomController;
