const Room = require("../db/models/room");
const User = require("../db/models/user");

const RoomController = {};

RoomController.createRoom = async () => {
  // Utilise RoomController.createRoom
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    const room = new Room({ code });
    await room.save();

    console.log("Room created");
    return room;
  } catch (error) {
    console.log(error);
    return error;
  }
};

RoomController.userJoin = async (req, res) => {
  const { _id, roomCode } = req.body;

  if (!_id && roomCode) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existUser = await User.findById({ _id });
  const existRoom = await Room.findOne({ code: roomCode });

  if (!existRoom) {
    return res.status(400).json({ message: "Room does not exist" });
  }

  if (!existUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  try {
    await User.updateOne({ _id }, { roomId: existRoom._id });
    sendMessage({ type: "join_room", user: existUser, room: existRoom });
    return res.status(201).json({
      message: `${existUser.pseudo} joined the room ${existRoom.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

RoomController.delete = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await Room.deleteOne({ _id });
    return res.status(201).json({ message: "Room deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = RoomController;
