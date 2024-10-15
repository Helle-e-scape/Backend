const User = require("../db/models/user");

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
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = AuthController;
