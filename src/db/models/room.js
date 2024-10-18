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

roomSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
  try {
    await mongoose.model("User").deleteMany({ roomId: this.getQuery()._id });
    await mongoose.model("TrapUser").deleteMany({ roomId: this.getQuery()._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Room", roomSchema);
