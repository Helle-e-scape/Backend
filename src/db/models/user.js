const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
});

module.exports = mongoose.model("User", userSchema);