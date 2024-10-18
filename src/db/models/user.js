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

userSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
  try {
    await mongoose.model("TrapUser").deleteMany({ userId: this.getQuery()._id });
    next();
  } catch (error) {
    next(error)
  }
});

module.exports = mongoose.model("User", userSchema);