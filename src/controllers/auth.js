const User = require("../db/models/user");
const { sendMessage } = require("../websocket");

const AuthController = {};

AuthController.register = async (req, res) => {
  const { pseudo } = req.body;

  if (!pseudo) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = new User({
      pseudo,
    });
    await user.save();
    sendMessage({ type: "create_user", user });
    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

AuthController.findById = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await User.findById(id);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

AuthController.findByIdRoom = async (req, res) => {
  const { roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const users = await User.find({ roomId: roomId });
    return res.status(201).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = AuthController;
