const Room = require("../db/models/room");
const User = require("../db/models/user");
const { sendMessage } = require("../websocket");

const WebsocketController = {};

WebsocketController.createRoom = async () => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    const room = new Room({ code });
    await room.save();

    sendMessage({ type: "roomCreated", message: "Room created", room });
    console.log("Room created");
  } catch (error) {
    console.log(error);
    sendMessage("error", { message: "Internal sserver error" });
    return error;
  }
};

module.exports = WebsocketController;
