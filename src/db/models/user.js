const { Schema } = require("mongoose");
const mongo = require("mongoose");

const userSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
