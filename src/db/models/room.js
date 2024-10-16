const { Schema, default: mongoose } = require("mongoose");

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

roomSchema.pre("remove", async function (next) {
  await this.model("User").deleteMany({ room_Id: this._id });
  next();
});

module.exports = mongoose.model("Room", roomSchema);
