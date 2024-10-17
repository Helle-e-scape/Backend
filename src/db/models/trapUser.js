const { Schema } = require("mongoose");
const mongoose = require("mongoose");


const trapUserSchema = new Schema({
    nameTrap: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
    },
});

module.exports = mongoose.model("TrapUser", trapUserSchema);